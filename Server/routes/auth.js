const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth/authController');
router.post('/sendEmailOtp', function (req, res) {
    authController.sendEmailOtp(req.body)
        .then(data => {
            res.status(201).json({ success: true, data: data });
        })
        .catch(err => {
            res.json({ success: false, error: err });
        });
});

router.post('/verifyOtp', function (req, res) {
    authController.verifyEmail(req.body)
        .then(data => {
            res.status(201).json({ success: true, data: data });
        })
        .catch(err => {
            res.json({ success: false, error: err });
        });
});

router.post('/signUp', function (req, res) {
    authController.signUp(req.body)
        .then(data => {
            res.status(201).json({ success: true, data: data });
        })
        .catch(err => {
            res.json({ success: false, error: err });
        });
});


router.post('/login', function (req, res) {
    authController.login(req.body)
        .then(data => {
            res.status(201).json({ success: true, data: data });
        })
        .catch(err => {
            res.json({ success: false, error: err });
        });
});





module.exports = router;
