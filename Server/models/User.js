const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new mongoose.Schema({
    firstLine:{
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    default:{
        type: Boolean,
        default: false
    }
});

const userSchema = new Schema({
    username: { type: String, required: true, trim:true},
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    role: { type:String, enum: ['Admin', 'User'], default:'User'},
    phone:{type:Number},
    address: [addressSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;