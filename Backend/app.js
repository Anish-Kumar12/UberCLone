const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const cors = require('cors')
const app = express();
const connectDB = require('./db/db');
const userRouter = require('./routes/user.routes');
const cookieParser = require('cookie-parser');

connectDB()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter); 



module.exports = app;