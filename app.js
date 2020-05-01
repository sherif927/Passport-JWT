const path = require('path');
require('dotenv').config({ path: path.join(__dirname, `./environment/${process.env.NODE_ENV}.env`) });
require('./db/mongoose');
require('./utils/redis');
const express = require('express');
const passport = require('passport');
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const setup = require('./config/passport.jwt')(passport);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);

module.exports = app;

