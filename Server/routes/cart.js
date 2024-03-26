const express = require("express");
const router = express.Router();
const cartController = require('../controllers/cart/cartController');

router.post('/addToCart', function (req, res) {
    cartController.addToCart(req.body,req.user)
        .then(data => {
            res.status(201).json({ success: true, data: data });
        })
        .catch(err => {
            res.json({ success: false, error: err });
        });
});

router.get('/getCart', function (req, res) {
    cartController.getCart(req.user._id)
        .then(data => {
            res.status(200).json({ success: true, data: data });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
});

router.post('/deleteItem', function (req, res) {
    cartController.deleteCartItem(req.body.id)
        .then(data => {
            res.status(200).json({ success: true, data: data });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
});

router.post('/updateQuantity', function (req, res) {
    let id = req.body.id;
    let qty = req.body.qty;
    cartController.updateItemQty(id,qty)
        .then(data => {
            res.status(200).json({ success: true, data: data });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err.message });
        });
});


module.exports = router;