const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (userData) => {
    const { fullName, email, password } = userData.data;

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
    const { email, password } = userData.data;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw { message: 'User not found' };
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw { message: 'Invalid credentials' };
        }
        const token = jwt.sign({email:user.email,userId:user._id},'tastebuds_token_food_delivery')
        return {token:token, user:user};
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
};
