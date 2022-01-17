const express = require('express');
const cors = require('cors');

require('dotenv').config()

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const guestRouter = require('./routes/guests');

var app = express();


//mongoose setup
var mongoose = require('mongoose');
var mongoDB = process.env.URI;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('open', () => { console.log('success my guy')})
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : []
const corsOptions = {
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) {
		  callback(null, true)
		} else {
		  callback(new Error("Not allowed by CORS"))
		}
	  }
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/guests', guestRouter, cors(corsOptions));

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));

module.exports = app;
