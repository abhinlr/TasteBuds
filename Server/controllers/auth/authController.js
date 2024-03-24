const User = require('../../models/User');
const OTP = require('../../models/Verification')
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
require('../../../Client/TasteBuds/.env');
const passport = require("passport");

exports.signUp = async (userData) => {
    const {fullName, email, password} = userData.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: fullName,
            email: email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        console.log('User created:', savedUser);
        return savedUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

exports.login = async (userData) => {
    const { email, password } = userData;
    return new Promise((resolve, reject) => {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                return reject(err);
            }
            if (!user) {
                return reject({ message: info.message });
            }
            resolve(user);
        })({ body: { email, password } }, {}, () => {});
    });
};

exports.fetchProfile= (session) => {
    return new Promise((resolve, reject) => {
        if (!session || !session.user) {
            reject(new Error('User session not found'));
            return;
        }
        const userData = session.user;
        resolve(userData);
    });
}

exports.sendEmailOtp = async (data) => {
    const email = data.email;
    const userExists = await User.findOne({email: email})
    if (userExists) {
        throw {
            message: 'User is already registered',
        };
    }
    let otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });
    const saveOtp = new OTP({
        email: email,
        otp: otp
    });
    const save = await saveOtp.save();
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "abhijithnileshwar1@gmail.com",
            pass: process.env.MAILAPPCODE
        },
    });
    const mailOptions = {
        from: "verification@tastebuds.com",
        to: email,
        subject: "Email Verification @TasteBuds",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification OTP</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .otp-code {
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }
    .note {
      font-style: italic;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <p>Hello,</p>
    <p>Your TasteBuds email verification OTP is:</p>
    <p class="otp-code">${otp}</p>
    <p class="note">The OTP will expire in 10 minutes</p>
    <p>Thank you,<br>Taste Buds</p>
  </div>
</body>
</html>
`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            throw {message: 'Error sending email', error: error};
        } else {
            return {message: info.response};
        }
    });
};

exports.verifyEmail = async (userData) => {
    const {otp, email} = userData;
    console.log(userData);

    try {
        const user = await OTP.findOne({email: email});
        if (!user) {
            throw {message: 'User not found'};
        }
        if(user.otp !== otp){
            throw {message: 'Entered OTP is wrong'};
        }
        return {email:user.email};
    } catch (error) {
        console.error('Error verifying email', error);
        throw error;
    }
};

