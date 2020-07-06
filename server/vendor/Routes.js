const stealenBikes = require("./Controller/StolenBikeController.js");
const ownersBikes = require("./Controller/OwnerController.js");
const policers = require("./Controller/PoliceController.js");

module.exports = [stealenBikes, ownersBikes, policers];