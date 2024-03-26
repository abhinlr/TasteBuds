const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const restRoute = require('./routes/restaurant');
const cartRoute = require('./routes/cart');
require('dotenv').config();
require('../Client/TasteBuds/.env');
const app = express();
const db = process.env.DB;
const passport = require('passport')
const methodOverride = require('method-override');
const mongoDBSession = require('connect-mongodb-session')(session);

const initializePassport = require('./passport-config')
initializePassport(passport);

mongoose.connect(db).then(() => console.log('Database connection successful')).catch(err => console.error('MongoDB connection error:', err));
const mongoDBStore = new mongoDBSession({
    uri:db,
    collection:'sessions'
})
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 86400000
    },
    store: mongoDBStore
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(authRoute);
app.use(restRoute);
app.use(cartRoute);

module.exports = app;
