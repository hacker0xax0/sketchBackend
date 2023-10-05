import mongoose from 'mongoose';

const GetProductSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true
        },
        productDescription: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String
        },
        image: {
            data: Buffer,
            contentType: String
        },
        stars: {
            type: Number,
            required: true
        },
        offer: {
            type: String
        },
        stock: {
            type: String
        },
    },
    { timestamp: true }
);

const Products = mongoose.model('Products', GetProductSchema);
export { Products };