import { Products } from "../model/products.js";
import { NewsLetter } from "../model/newsletter.js";
import { Users } from "../model/users.js";

async function productDetail(req, res) {
    try {
        const id = req.params.id;
        const data = await Products.findById(id);
        res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

async function postProduct(req, res) {
    try {
        const newProduct = new Products({
            productName: req.body.productName,
            productDescription: req.body.productDescription,
            price: req.body.price,
            category: req.body.category,
            stars: req.body.stars,
            offer: req.body.offer,
            stock: req.body.stock,
            image: {
                data: req.file,
                contentType: 'image/png'
            }
        });
        await newProduct.save()
        res.json({
            message: 'success'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const dataToBeUpdated = req.body;
        let keys = [];
        for (let key in dataToBeUpdated) {
            keys.push(key);
        }
        let product = await Products.findById(id);
        for (let i = 0; i < keys.length; i++) {
            product[keys[i]] = dataToBeUpdated[keys[i]];
        }
        await product.save();
        return res.status(200).json({
            message: 'updated successfully',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

async function newsletter(req, res) {
    try {
        const payload = req.body;
        const data = new NewsLetter(payload);

        await data.save();
        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

async function getProducts(req, res) {
    try {
        const params = req.params;
        if (params.params !=='all') {
            const dataToShow = await Products.find({ category: params.params });
            console.log(dataToShow);
            res.status(200).json({
                success: true,
                message: "Data fetched successfully",
                data: dataToShow
            });
        }
        else {
            const dataToShow = await Products.find();
            res.status(200).json({
                success: true,
                message: "Data fetched successfully",
                data: dataToShow
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


export { productDetail, postProduct, updateProduct, newsletter, getProducts };