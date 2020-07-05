const bcrypt = require("bcryptjs");

const saltRounds = 12;

async function getHash(maskToken) {
  return await bcrypt.hash(maskToken, saltRounds).then(function(hash) {
    return hash;
  });
}


module.exports = { getHash };
