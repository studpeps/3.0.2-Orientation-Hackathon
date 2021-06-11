const express = require("express");
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const path = require('path')
require('dotenv').config();
const errorHandlers = require("./handlers/errorHandler");
const apiRouter = require('./routes/api');
const indexRouter = require('./routes/index');
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use('/api', apiRouter)
app.use('/', indexRouter)

app.use( (req, res, next) => {
    res.status(404).send("Sorry can't find that!")
})

module.exports = app;
