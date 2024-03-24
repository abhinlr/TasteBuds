const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cart/cartController');

router.post('/addToCart', function (req, res) {
    cartController.addToCart(req.body,req.session.user)
        .then(data => {
            res.status(201).json({ success: true, data: data });
        })
        .catch(err => {
            res.json({ success: false, error: err });
        });
});

router.get('/getCart', function (req, res) {
    cartController.getCart(req.session.user)
        .then(data => {
            res.status(200).json({ success: true, data: data });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
});


module.exports = router;