const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const restRoute= require('./routes/restaurant');
require('dotenv').config();
require('../Client/TasteBuds/.env');

const app = express();
const db = process.env.DB;

mongoose.connect(db).then(() => console.log('Database connection successful')).catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(authRoute);
app.use(restRoute);

module.exports = app;
