const { Router } = require("express");

const { check, validationResult } = require("express-validator");

const StolenBikes = require("../Model/StolenBikes");

const router = Router();

router.get(
  "/getStolenBikes",
  [
    check("name", "Name is required").isString(),
    check("owner", "Owner is required").isString(),
  ],
  async (req, res) => {
    const { owner, name } = req.query;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        msg: req.query,
      });
    }

    var query = StolenBikes.findOne({ owner: owner, name: name });

    query.select("id name owner group parent created_at");

    query.exec((err, person) => {
      if (err) return handleError(err);

      return res.status(200).json({
        details: person ? person : [],
        msg: person ? "OK" : "Stealen bike hasn't been found",
        code: person ? 1 : 2,
        get: req.query,
        post: req.body,
      });
    });
  }
);

router.post(
  "/fillOutStolenBike",
  [
    check("name", "Name is required").isString(),
    check("owner", "Owner is required").isString(),
  ],
  async (req, res) => {
    const { owner, name } = req.query;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        msg: req.query,
      });
    }

    var query = StolenBikes.findOne({ owner: owner, name: name });

    query.select("id name owner group parent created_at");

    query.exec((err, person) => {
      if (err) return handleError(err);

      return res.status(200).json({
        details: person ? person : [],
        msg: person ? "OK" : "Stealen bike hasn't been found",
        code: person ? 1 : 2,
        get: req.query,
        post: req.body,
      });
    });
  }
);

module.exports = router;
