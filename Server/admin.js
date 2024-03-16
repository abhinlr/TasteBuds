const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')

const app = express();
password = '';

const db = 'mongodb+srv://tastebuds:tastebuds@cluster0.htvoug9.mongodb.net/TasteBuds?retryWrites=true&w=majority&appName=Cluster0'


mongoose.connect(db).then(() => console.log('Database connection successful')).catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.post('/signUp',authRoute);
app.post('/login', authRoute);



module.exports = app;
