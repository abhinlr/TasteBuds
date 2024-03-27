const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartItemSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const cartSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    items: [cartItemSchema],
    total:{
        type:Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware to calculate total
cartSchema.pre('save', async function(next) {
    let total = 0;
    for (const item of this.items) {
        try {
            const product = await mongoose.model('Product').findById(item.product);
            if (product) {
                total += product.price * item.quantity;
            }
        } catch (error) {
            console.error('Error while calculating total:', error);
            return next(error);
        }
    }
    this.total = total;
    next();
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
