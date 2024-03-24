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

router.post('/login', function (req, res) {
    authController.login(req.body)
        .then(data => {
            const userData = data.toObject();
            delete userData.password;
            req.session.user = userData;
            res.status(201).json({ success: true, user: userData });
        })
        .catch(err => {
            res.json({success: false, error: err});
        });
});

router.get('/profile', function (req, res) {
    authController.fetchProfile(req.session)
        .then(data => {
            res.json({ success: true, user: data });
        })
        .catch(err => {
            res.json({ success: false, error: err.message });
        });
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
