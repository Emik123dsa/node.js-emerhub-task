const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { getHash } = require("../Helpers/Hash");
const { check, validationResult } = require("express-validator");

const status = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  APPROVEN: "APPROVEN",
  DENIED: "DENIED",
};

const { v4: uuidv4 } = require("uuid");

const config = require("../Config");

const VENDOR_CONNECTION = config;

const StolenBikes = require("../Model/StolenBikes");

const Policers = require("../Model/Policers");

const yyyymmdd = require("../Helpers/Date");

const jwt = require("jsonwebtoken");

const router = Router();

router.post(
  "/resolveStolenBike",
  [
    check("email", "Email is not valid").isEmail(),
    check("operation", "Operation is not valid").notEmpty(),
    check("bearer", "Police identificator is not valid").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        msg: req.query,
      });
    }

    var isAvailable = true;
    var servedBikes = [];

    try {
      const { email, operation, bearer } = req.body;

      var owner = await Policers.findOne({
        email: email,
      });

      if (owner === null || typeof owner === null) {
        return res.status(401).json({
          msg: "This policer is not existing",
          code: 2,
        });
      }

      const match = await bcrypt.compare(bearer, owner.bearer);

      if (match) {
        if (owner.served_bikes.length === 1) {
          var updatedStolenBike = await StolenBikes.findOne({
            serial_number: owner.served_bikes[0]["serial_number"],
          });

          if (updatedStolenBike) {
            await StolenBikes.findOneAndUpdate(
              {
                serial_number: owner.served_bikes[0]["serial_number"],
              },
              {
                status: operation,
                modified_at: yyyymmdd,
              },
              {
                upsert: true,
                useFindAndModify: false,
                rawResult: true,
              }
            );

            const historyBikes = {
              id: updatedStolenBike.id,
              name_bike: updatedStolenBike.name_bike,
              model_bike: updatedStolenBike.model_bike,
              serial_number: updatedStolenBike.serial_number,
              asap: updatedStolenBike.asap,
              status: operation,
              created_at: updatedStolenBike.created_at,
              modified_at: yyyymmdd,
            };

            var remainStolenBikes = await StolenBikes.find().sort("created_at");

            if (remainStolenBikes.length > 0) {
              if (
                remainStolenBikes.some((item) => item.status === status.PENDING)
              ) {
                isAvailable = false;
                servedBikes = remainStolenBikes.find(
                  (item) => item.status === status.PENDING
                );

                await StolenBikes.findOneAndUpdate(
                  {
                    id: servedBikes.id,
                  },
                  {
                    status: status.ACTIVE,
                    modified_at: yyyymmdd,
                  },
                  {
                    upsert: true,
                    useFindAndModify: false,
                    rawResult: true,
                  }
                );
              }
            }

            await Policers.findOneAndUpdate(
              {
                email: email,
              },
              {
                served_bikes: servedBikes,
                is_available: isAvailable,
                $push: {
                  history_bikes: historyBikes,
                },
                modified_at: yyyymmdd,
              },
              {
                upsert: true,
                useFindAndModify: false,
                rawResult: true,
              }
            );

            return res.status(200).json({
              details: updatedStolenBike,
              msg: "Updated",
              code: 1,
            });
          } else {
            return res.status(400).json({
              msg: "Sorry, this stolen bikes is not existing",
              code: 2,
            });
          }
        } else {
          return res.status(400).json({
            msg: "Sorry, but you are not having any served bikes yet",
            code: 2,
          });
        }
      } else {
        return res.status(401).json({
          msg: "This policer is not existing",
          code: 2,
        });
      }
    } catch (e) {
      return res.status(500).json({
        msg: "Your request hasn't been approven",
        code: 5,
      });
    }
  }
);

router.get(
  "/getHistoryBikes",
  [
    check("email", "Email is not valid").isEmail(),
    check("bearer", "Police identificator is not valid").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        msg: req.query,
      });
    }
    try {
      const { email, bearer, mode } = req.query;

      var owner = await Policers.findOne({
        email: email,
      });

      if (owner === null || typeof owner === null) {
        return res.status(401).json({
          msg: "This policer is not existing",
          code: 2,
        });
      }

      const match = await bcrypt.compare(bearer, owner.bearer);
      if (match) {
        return res.status(200).json({
          details:
            owner && mode === "history"
              ? owner.history_bikes
              : owner.served_bikes,
          msg: "OK",
          code: 1,
        });
      } else {
        return res.status(401).json({
          msg: "This policer is not existing",
          code: 2,
        });
      }
    } catch (e) {
      return res.status(500).json({
        msg: "Your request hasn't been approven",
        code: 5,
      });
    }
  }
);

router.post(
  "/createPoliceQuery",
  [
    check("bearer", "Police Identificator is not valid").notEmpty(),
    check("email", "Email is not valid").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        msg: req.query,
      });
    }

    try {
      const { email, bearer } = req.body;

      let bearerToken = await getHash(bearer);

      var servedBikes = [];

      var isAvailable = true;

      var stolen_bikes = await StolenBikes.find().sort("created_at");

      if (stolen_bikes.length > 0) {
        if (stolen_bikes.some((item) => item.status === status.PENDING)) {
          var currentBike = stolen_bikes.find(
            (item) => item.status === status.PENDING
          );
          servedBikes = [
            {
              id: currentBike.id,
              name_bike: currentBike.name_bike,
              serial_number: currentBike.serial_number,
              asap: currentBike.asap,
              status: status.ACTIVE,
              created_at: currentBike.created_at,
              modified_at: yyyymmdd,
            },
          ];
          isAvailable = false;
        } else {
          isAvailable = true;
        }
      }

      var createPolicer = new Policers({
        id: uuidv4(),
        bearer: bearerToken,
        email: email,
        is_available: isAvailable,
        served_bikes: servedBikes,
        history_bikes: servedBikes,
        parent: "policer",
        created_at: yyyymmdd,
        modified_at: yyyymmdd,
      });

      const token = jwt.sign(
        {
          policeIdentificator: bearerToken,
        },
        VENDOR_CONNECTION.json_web_token,
        { expiresIn: 60 * 60 * 24 }
      );

      await createPolicer.save(async (error) => {
        if (error) {
          return res.status(400).json({
            code: 2,
            error,
          });
        }

        if (currentBike) {
          await StolenBikes.findOneAndUpdate(
            {
              serial_number: currentBike.serial_number,
            },
            {
              status: status.ACTIVE,
              modified_at: yyyymmdd,
            },
            {
              upsert: true,
              useFindAndModify: false,
              rawResult: true,
            }
          );
        }

        return res.status(200).json({
          details: token,
          msg: "OK",
          code: 1,
          get: req.query,
          post: req.body,
        });
      });
    } catch (e) {
      return res.status(500).json({
        msg: "Your request hasn't been approven",
        code: 5,
      });
    }
  }
);

module.exports = router;
