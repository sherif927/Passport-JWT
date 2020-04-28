const router = require('express').Router();
const passport = require('passport');
const UserService = require('../services/user.service');
const _ = require('lodash');

router.get('/', (req, res) => {
  res.send('<h1>Auth Route</h1>');
});


router.post('/login', async (req, res) => {
  let userInfo = _.pick(req.body, ['email', 'password']);
  let response = await UserService.loginUser(userInfo)
    .catch(e => res.status(500).send(e));
  res.json(response);
});


router.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
  req.logOut();
  res.json({ message: 'Logged out successfully 👌' });
});

module.exports = router;