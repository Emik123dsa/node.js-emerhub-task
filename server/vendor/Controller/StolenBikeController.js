const { Router } = require("express");

const { check, validationResult } = require("express-validator");

const status = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  APPROVEN: "APPROVEN",
  DENIED: "DENIED",
};

const yyyymmdd = require("../Helpers/Date");

const StolenBikes = require("../Model/StolenBikes");

const router = Router();

router.get(
  "/getStolenBikes",
  [
    check("name", "Name is required").isString(),
    check("owner", "Owner is required").isString(),
  ],
  async (req, res) => {
    const { owner, model_bike, serial_number, name_bike } = req.query;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        msg: req.query,
      });
    }

    var query = StolenBikes.findOne({
      owner: owner,
      name_bike: name_bike,
      serial_number: serial_number,
      model_bike: model_bike,
    });

    query.select(
      "id owner name_bike model_bike serial_number asap status created_at modified_at"
    );

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
  "/fillOutStolenBikes",
  [
    check("owner", "Owner is required").isString(),
    check("name_bike", "Name of bike is required").isString(),
    check("model_bike", "Model of bike is required").isAscii(),
    check("serial_number", "Serial number is required").isString(),
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
      const { owner, name, model, serial_number, asap } = req.body;

      var saveToStolenBieks = new StolenBikes({
        id: Date.now().toString(),
        owner: owner,
        name_bike: name,
        model_bike: model,
        serial_number: serial_number,
        asap: asap ? asap : false,
        status: status.PENDING,
        created_at: yyyymmdd,
        modified_at: yyyymmdd,
      });

      saveToStolenBieks.save(function(error) {
        if (error) return handleError(error);
      });

      return res.status(200).json({
        details: ["Stolen bike has been succesfully added"],
        msg: "OK",
        code: 1,
        get: req.query,
        post: req.body,
      });
    } catch (e) {
      return res.status(500).json({
        msg: "Internal server error",
        code: 5,
      });
    }
  }
);

module.exports = router;
