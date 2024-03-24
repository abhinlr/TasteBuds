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
        const url = 'https://foodfire.onrender.com/api/restaurants?lat=12.9716&lng=77.5946&page_type=DESKTOP_WEB_LISTING';
        // const url = 'https://cors-anywhere.herokuapp.com/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.251137&lng=75.126805';
        // const url = `https://instafood.onrender.com/api/restaurants?lat=12.9716&lng=77.5946`;
        return fetch(url)
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

exports.getRestaurantMenu = async (data) => {
    try {
        const restaurantId = data.restaurantId;
        const url = `https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=12.9716&lng=77.5946&&submitAction=ENTER&restaurantId=${restaurantId}`
        // const url = `https://instafood.onrender.com/api/menu?lat=12.251137&lng=75.126805&menuId=${restaurantId}`;
        // const url = `https://www.swiggy.com/api/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.251137&lng=75.126805&submitAction=ENTER&restaurantId=${restaurantId}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const jsonData = await response.json(); // Parse the JSON response
        return jsonData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
