const { Router } = require("express");
const { getHash, compare } = require("../Helpers/Hash");
const { check, validationResult } = require("express-validator");

const { v4: uuidv4 } = require("uuid");

import config from "../Config";

const { VENDOR_CONNECTION } = config;

const Owners = require("../Model/Owners");

const yyyymmdd = require("../Helpers/Date");

const jwt = require("jsonwebtoken");

const router = Router();

router.post(
  "/createBikeUser",
  [
    check("owner", "Owner is required").notEmpty(),
    check("address", "Address is required").notEmpty(),
    check("phone_number", "Phone number is required").isMobilePhone(),
    check("passport_number", "Passport number is required").isMobilePhone(),
    check("email", "Email is not correct").isEmail(),
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
      const { owner, address, phone_number, passport_number, email } = req.body;

      const passport = await getHash(passport_number);

      var createUser = new Owners({
        id: uuidv4(),
        address: address,
        owner: owner,
        bikes: [],
        phone_number: phone_number,
        passport_number: passport,
        email: email,
        parent: "user",
        created_at: yyyymmdd,
        modified_at: yyyymmdd,
      });

      const token = jwt.sign(
        {
          userPassport: passport,
        },
        VENDOR_CONNECTION.json_web_token,
        { expiresIn: 60 * 60 * 24 }
      );

      await createUser.save((error) => {
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
