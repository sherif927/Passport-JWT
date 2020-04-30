const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../models/user');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET,
};

/**
* verify callback , method called
* after verification & decoding of JWT
* 
* @param {*} payload
* @param {*} done
*/
const strategy = new JWTStrategy(options, async (payload, done) => {
  let existingUser = await User.findOne({ _id: payload.id }).catch(e => done(e, null));
  return (existingUser) ?
    done(null, existingUser) :
    done(null, false);
});



module.exports = (passport) => {
  passport.use(strategy);
}