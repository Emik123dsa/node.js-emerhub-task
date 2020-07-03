const { Router } = require("express");
const Bikes = require("./Model/Bikes");

const router = Router();

router.get("/bikes", async (req, res) => {
    var query = Bikes.find();

    query.select("id name group parent created_at");

    query.exec((err, person) => {
      if (err) return handleError(err);
      res.send(person);
    });
});

module.exports = router;
