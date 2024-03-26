const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth/authController');
router.post('/sendEmailOtp', function (req, res) {
    authController.sendEmailOtp(req.body)
        .then(data => {
            res.status(201).json({success: true, data: data});
        })
        .catch(err => {
            res.json({success: false, error: err});
        });
});

router.post('/verifyOtp', function (req, res) {
    authController.verifyEmail(req.body)
        .then(data => {
            res.status(201).json({success: true, data: data});
        })
        .catch(err => {
            res.json({success: false, error: err});
        });
});

router.post('/signUp', function (req, res) {
    authController.signUp(req.body)
        .then(data => {
            res.status(201).json({success: true, data: data});
        })
        .catch(err => {
            res.json({success: false, error: err});
        });
});

router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return res.status(500).json({ message: 'An error occurred during authentication.' });
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.login(user, function(err) {
            if (err) {
                return res.status(500).json({ message: 'An error occurred during login.' });
            }
            return res.status(200).json({success:true,user:user});
        });
    })(req, res, next);
});

router.get('/profile', function (req, res) {
    if(req.user){
        res.setHeader('Cache-Control', 'no-cache');
        res.status(200).json({success:true,user:req.user});
    }else{
        res.status(200).json({success:false,user:null});
    }
});

router.get('/logout', function (req, res) {
    req.session.destroy(function(err) {
        if(err) {
            res.status(500).json({ success: false, error: 'Failed to logout' });
        } else {
            res.json({ success: true });
        }
    });
});




module.exports = router;
