const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'tastebuds_token_food_delivery');
        next();
    } catch{
        res.json({success:false,message:'Auth failed'})
    }
};