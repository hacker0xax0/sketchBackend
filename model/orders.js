import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    productDescription: {
        type: String
    },
    productName: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    status: {
        type: Number
    },
    email: {
        type: String
    },
    orderId: {
        type: String
    },
    orderedBy: {
        type: String
    },
    orderedAt: {
        type: String
    },
    pinCode: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    imageUrl: {
        type: String
    },
    image: {
        data: Buffer
    },
    stars: {
        type: Number
    },
    stock: {
        type: String
    },
    address: {
        type: String
    },
    createdAt: {
        type: String
    }
});

const SketcheOrders = mongoose.model("SketcheOrders", orderSchema);
export { SketcheOrders };