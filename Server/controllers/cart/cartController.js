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
        user = user._id.toString();
        let cart = await Cart.findOne({user: user});
        if (!cart) {
            cart = new Cart({ user: user, items: [] });
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
    user = user.toString();
    try{
        let cart = await Cart.findOne({user: user}).populate('items.product').exec();
        if(!cart){
            throw error;
        }
        return cart;

    }catch(error){
        throw error;
    }

};

exports.deleteCartItem = async (itemId) => {
    try {
        let cart = await Cart.findOne().populate('items.product').exec();
        if (!cart) {
            throw { message: 'Unable to find cart.' };
        }
        console.log(itemId);
        const indexToDelete = cart.items.findIndex(item => item._id.toString() === itemId);
        if (indexToDelete === -1) {
            throw { message: 'Item not found in cart.' };
        }

        cart.items.splice(indexToDelete, 1);
        await cart.save();

        return { cart: cart };
    } catch (error) {
        throw error;
    }
};


exports.updateItemQty = async (itemId,qty) => {
    try {
        let cart = await Cart.findOne().populate('items.product').exec();
        if (!cart) {
            throw { message: 'Unable to find cart.' };
        }
        const item = cart.items.find(item => item._id.toString() === itemId);
        if (!item) {
            throw { message: 'Item not found in cart.' };
        }

        item.quantity = qty;
        await cart.save();


        return { cart:cart };

    }catch(error){
        throw error;
    }

};

