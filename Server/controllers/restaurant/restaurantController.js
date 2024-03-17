const fetch = require('node-fetch');
const geoapifykey = 'c5163cad70594a68ac76bc1ab76dc8e7';
require('dotenv').config();
require('../../../Client/TasteBuds/.env');

exports.getLocation = async (data) => {
    try {
        const lng = data.lng;
        const lat = data.lat;
        var requestOptions = {
            method: 'GET',
        };
        return fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${process.env.GEOAPIFYKEY}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                return result; // Return the result
            })
            .catch(error => {
                throw error;
            });
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }

};

exports.getRestaurants = async (data) => {
    try {
        const lng = data.lng;
        const lat = data.lat;
        return fetch(`https://instafood.onrender.com/api/restaurants?lat=${lat}&lng=${lng}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the JSON response
            })
            .catch(error => {
                throw error;
            });

    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }

};