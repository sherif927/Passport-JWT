require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const passport = require('passport');
const authRouter = require('./routes/auth.router');
const userRouter = require('./routes/user.router');
const setup = require('./config/passport.jwt')(passport);

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/users', userRouter);



const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port} 👌`));