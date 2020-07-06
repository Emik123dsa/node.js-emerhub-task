const { Router } = require("express");
const { getHash, compare } = require("../Helpers/Hash");
const { check, validationResult } = require("express-validator");

const status = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  APPROVEN: "APPROVEN",
  DENIED: "DENIED",
};

const { v4: uuidv4 } = require("uuid");

import config from "../Config";

const { VENDOR_CONNECTION } = config;

const StolenBikes = require("../Model/StolenBikes");

const Policers = require("../Model/Policers");

const yyyymmdd = require("../Helpers/Date");

const jwt = require("jsonwebtoken");

const router = Router();

router.post("/resolveStolenBike", [], async (req, res) => {});

router.post("/deniedStolenBike", [], async (req, res) => {});

router.get("/getStolenBikes", [], async (req, res) => {});

router.post(
  "/createPoliceQuery",
  [
    check("bearer", "Police Identificator is required").notEmpty(),
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
      const { email, bearer } = req.body;

      let bearerToken = await getHash(bearer);

      var servedBikes = [];

      var isAvailable = true;

      var stolen_bikes = await StolenBikes.find()
        .sort("created_at")
        .orFail((err) =>
          res.status(400).json({
            msg: "Bikes are not existing in the table yet",
            code: 2,
            error: err,
          })
        );

      if (stolen_bikes.some((item) => item.status === status.PENDING)) {

        var currentBike = stolen_bikes.find(
          (item) => item.status === status.PENDING
        );

        servedBikes = [updatedBike];

        isAvailable = false;
      } else {
        isAvailable = true;
      }

      var createPolicer = new Policers({
        id: uuidv4(),
        bearer: bearerToken,
        email: email,
        is_available: isAvailable,
        served_bikes: servedBikes,
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

      await createPolicer.save((error) => {
        if (error) {
          return res.status(400).json({
            code: 2,
            error,
          });
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
