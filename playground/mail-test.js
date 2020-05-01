const mailer = require('../utils/mail');

const sendMail = async () => {
  const url = mailer.createConfirmEmailLink('http://localhost:3000/users');
  mailer.sendConfirmationEmail(url, 'demonionsphere@gmail.com', 'Sherif Amr');
}

sendMail();

