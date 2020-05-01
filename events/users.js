const Emitter = require('events').EventEmitter;
const mailer = require('../utils/mail');
const UserEmitter = new Emitter();

UserEmitter.on('userRegistered', async ({ _id, email, name }) => {
  const url = await mailer.createConfirmEmailLink('http://localhost:3000/users', _id).catch(e => console.log(e));
  console.log(url);
  mailer.sendConfirmationEmail(url, email, name);
});

module.exports = UserEmitter;