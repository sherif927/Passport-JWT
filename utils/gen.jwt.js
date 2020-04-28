const jwt = require('jsonwebtoken');

/**
 * method responsible for
 * token generation from
 * user id
 * 
 * @param {*} user
 * @returns
 */

const generateToken = (user) => {
  const id = user._id;
  const expiresIn = '14d';
  const payload = { id, iat: Date.now() };
  const token = 'Bearer ' + jwt.sign(payload, process.env.SECRET, { expiresIn });
  return { token, expiresIn };
}

module.exports = { generateToken };