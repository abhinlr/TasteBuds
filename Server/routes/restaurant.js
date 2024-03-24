const express = require("express");
const router = express.Router();
const restaurantController = require('../controllers/restaurant/restaurantController');

router.post('/getLocationInfo', function (req, res) {
    restaurantController.getLocation(req.body)
        .then(data => {
            res.status(201).json({ success: true, data: data });
        })
        .catch(err => {
            res.json({ success: false, error: err });
        });
});

router.post('/getRestaurants', function (req,res){
    restaurantController.getRestaurants(req.body)
        .then(data=>{
            res.status(201).send({success:true,data:data});
        })
        .catch(err=>{
            res.send({ success: false, error: err });
        })
})

router.post('/getRestaurantMenu', function (req,res){
    restaurantController.getRestaurantMenu(req.body)
        .then(data=>{
            res.status(201).send({success:true,data:data});
        })
        .catch(err=>{
            res.send({ success: false, error: err });
        })
})

module.exports = router;
