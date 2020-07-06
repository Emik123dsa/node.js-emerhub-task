const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { getHash, compare } = require("../Helpers/Hash");
const { check, validationResult } = require("express-validator");

const status = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  APPROVEN: "APPROVEN",
  DENIED: "DENIED",
};

const yyyymmdd = require("../Helpers/Date");

const StolenBikes = require("../Model/StolenBikes");
const Owners = require("../Model/Owners");

const router = Router();

router.get(
  "/getStolenBikes",
  [
    check("serial_number", "Serial number is required").notEmpty(),
    check("passport_number", "Passport is required").isString(),
    check("email", "Email is required").isString(),
  ],
  async (req, res) => {
    const { serial_number, passport_number, email } = req.query;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        msg: req.query,
      });
    }

    var owner = await Owners.findOne({
      email: email,
    })
      .select("bikes passport_number")
      .orFail((err) => {
        return res.status(400).json({
          msg: "This client is not existing",
          code: 2,
        });
      });

    const passport = await bcrypt.compare(
      passport_number,
      owner.passport_number
    );

    if (passport) {
      if (!owner.bikes.some((item) => item === serial_number)) {
        return res.status(400).json({
          code: 3,
          msg: "Bike hasn't found",
        });
      }

      if (owner.bikes.length > 0) {
        var stolenBike;

        stolenBike = StolenBikes.findOne({
          serial_number: serial_number,
        });

        stolenBike.select(
          "id owner name_bike model_bike serial_number asap status created_at modified_at"
        );

        stolenBike.exec((err, person) => {
          if (err) return handleError(err);

          return res.status(200).json({
            details: person ? person : [],
            msg: person ? "OK" : "Stealen bike hasn't been found",
            code: person ? 1 : 2,
            get: req.query,
            post: req.body,
          });
        });
      } else {
        return res.status(200).json({
          msg: "This user is not having any stolen bikes yet",
          code: 2,
        });
      }
    } else {
      return res.status(401).json({
        msg: "This user is not existing",
        code: 2,
      });
    }
  }
);

router.post(
  "/fillOutStolenBikes",
  [
    check("name_bike", "Name of bike is required").notEmpty(),
    check("model_bike", "Model of bike is required").notEmpty(),
    check("serial_number", "Serial number is required").isString(),
    check("passport_number", "Passport number is required").notEmpty(),
    check("email", "Email is required").isEmail(),
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
      const {
        name_bike,
        model_bike,
        serial_number,
        asap,
        passport_number,
        email,
      } = req.body;

      var query = await Owners.findOne({
        email: email,
      })
        .select("passport_number bikes id")
        .orFail((err) => {
          return res.status(400).json({
            msg: "This client is not existing",
            code: 2,
          });
        });

      const match = await bcrypt.compare(
        passport_number,
        query.passport_number
      );

      if (match) {
        if (query.bikes.length > 4) {
          return res.status(201).json({
            code: 3,
            msg: "You have reached out common limit requests of stolen bikes",
          });
        }

        var saveToStolenBikes = new StolenBikes({
          id: Date.now().toString(),
          name_bike: name_bike,
          model_bike: model_bike,
          serial_number: serial_number,
          asap: asap ? asap : false,
          status: status.PENDING,
          created_at: yyyymmdd,
          modified_at: yyyymmdd,
        });

        await saveToStolenBikes.save(async (error) => {
          if (error) {
            return res.status(400).json({
              code: 2,
              error,
            });
          }

          await Owners.findOneAndUpdate(
            { email: email },
            { $push: { bikes: serial_number } },
            {
              upsert: true,
              useFindAndModify: false,
              rawResult: true,
            }
          );

          return res.status(200).json({
            details: ["Stolen bike has been succesfully added"],
            msg: "OK",
            code: 1,
            get: req.query,
            post: req.body,
          });
        });
      } else {
        return res.status(401).json({
          msg: "Passport number is required",
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

module.exports = router;
