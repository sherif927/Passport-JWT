const router = require('express').Router();
const passport = require('passport');
const UserService = require('../services/user.service');
const _ = require('lodash');

router.get('/', (req, res) => {
  res.send('<h1>User Route</h1>');
});

router.post('/register', async (req, res) => {
  let userBody = _.pick(req.body, ['name', 'age', 'email', 'password', 'gender', 'country', 'phoneNumber']);
  let response = await UserService.registerNewUser(userBody)
    .catch(e => res.status(500).send(e));
  res.json(response);
})

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(`Hey there ${req.user.name}`);
});

module.exports = router;