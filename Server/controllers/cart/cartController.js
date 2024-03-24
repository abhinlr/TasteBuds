require('dotenv').config();
require('../../../Client/TasteBuds/.env');
const User = require("../../models/User");
const Product = require('../../models/Product');
const Cart = require('../../models/Cart');

exports.addToCart = async (data,user) => {
    try{
        let existingProduct = await Product.findOne({code: data.id});
        if(!existingProduct){
            const product = new Product;
            product.name =data.name;
            product.code = data.id;
            product.description = data.description;
            product.price = (data.price/100);
            product.category = data.category;
            product.imageUrl = data.imageId;
            product.addOns = data.addons;
            product.offers = data.offersTags;

            await product.save();
            existingProduct = product;
        }
        let cart = await Cart.findOne({user: user._id});
        if (!cart) {
            cart = new Cart({ user: user._id, items: [] });
        }
        const existingItem = cart.items.find(item => item.product.toString() === existingProduct._id);
        if(existingItem) {
            existingItem.quantity += data.quantity;
        } else {
            cart.items.push({ product: existingProduct._id, quantity: data.quantity });
        }
        cart.updatedAt = new Date();
        await cart.save();

        return cart;


    }catch(error){
        throw error;
    }

};

exports.getCart = async (user) => {
    try{
        let cart = await Cart.findOne({user: user._id}).populate('items.product').exec();
        if(!cart){
            throw error;
        }
        return cart;

    }catch(error){
        throw error;
    }

};