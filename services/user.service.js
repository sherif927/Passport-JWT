const { User } = require('../models/user');
const { generateToken } = require('../utils/gen.jwt');

/**
 *
 * @class UserService
 */
class UserService {

  /**
   * creates a new user
   * and generates a new
   * jsonwebtoken for
   * future transactions
   *
   * @param {*} newUser: User object
   * @returns Promise<Token>
   * @memberof UserService
   */
  async registerNewUser(newUser) {
    let user = new User({ ...newUser });
    let response = await user.save().catch(console.log);
    let token = generateToken(response._id);
    return token;
  }

  /**
   * logs in the user
   * and generates a new
   * jsonwebtoken for
   * future transactions
   *
   * @param {*} { email, password }
   * @returns
   * @memberof UserService
   */
  async loginUser({ email, password }) {
    let existingUser = await User.findOne({ email }).catch(e => console.log(e));
    if (existingUser) {
      let validity = await existingUser.isValidPassword(password).catch(e => console.log(e));
      if (validity) {
        let token = generateToken(existingUser._id);
        return token;
      }
    } else {
      return Promise.reject({ message: 'Login Failed' });
    }
  }

}

module.exports = new UserService();