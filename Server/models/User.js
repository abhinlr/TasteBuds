const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, trim:true},
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    role: { type:String, enum: ['Admin', 'User'], default:'User'}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
