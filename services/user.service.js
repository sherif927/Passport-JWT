const { User } = require('../models/user');
const { generateToken } = require('../utils/gen.jwt');
const { getAsync } = require('../utils/redis');
const UserEmitter = require('../events/users');

/**
 *
 * @class UserService
 */
class UserService {

  /**
   * creates a new user and generates a new
   * jsonwebtoken for future transactions
   *
   * @param {*} newUser: User object
   * @returns Promise<Token>
   * @memberof UserService
   */
  async registerNewUser(newUser) {
    let user = new User({ ...newUser });
    let response = await user.save().catch(e => { throw e });
    UserEmitter.emit('userRegistered', response);
    let token = generateToken(response._id);
    return token;
  }

  /**
   * verifies the user sent in the callback
   * 
   *
   * @param {*} identifier
   * @returns
   * @memberof UserService
   */
  async confirmRegistration(identifier) {
    let userId = await getAsync(identifier).catch(e => { throw e });
    let existingUser = await User.findByIdAndUpdate(userId, { verified: true }).catch(e => { throw e });
    return existingUser;
  }

  /**
   * logs in the user and generates a new
   * jsonwebtoken for future transactions
   *
   * @param {*} { email, password }
   * @returns Promise<Token>
   * @memberof UserService
   */
  async loginUser({ email, password }) {
    let existingUser = await User.findOne({ email }).catch(e => { throw e });
    if (existingUser) {
      let validity = await existingUser.isValidPassword(password).catch(e => { throw e });
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