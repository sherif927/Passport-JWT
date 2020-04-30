const router = require('express').Router();
const passport = require('passport');
const UserService = require('../services/user.service');
const _ = require('lodash');

router.get('/', (req, res) => {
  res.send('<h1>User Route</h1>');
});

router.post('/register', (req, res) => {
  let userBody = _.pick(req.body, ['name', 'age', 'email', 'password', 'gender', 'country', 'phoneNumber']);
  UserService.registerNewUser(userBody)
    .then(response => res.json(response))
    .catch(e => res.status(500).send(e));
})

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(`Hey there ${req.user.name}`);
});

module.exports = router;