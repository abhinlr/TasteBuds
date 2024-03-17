const jwt = require('jsonwebtoken');
require('dotenv').config();
require('../../Client/TasteBuds/.env');

module.exports = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET);
        next();
    } catch{
        res.json({success:false,message:'Auth failed'})
    }
};