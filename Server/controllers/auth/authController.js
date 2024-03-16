const User = require('../../models/User');
const bcrypt = require('bcrypt');

exports.signUp = async (userData) => {
    const { username, email, password } = userData.data;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
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

        return user.email;
    } catch (error) {
        console.error('Error finding user:', error);
        throw error;
    }
};