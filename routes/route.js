import express from 'express';
import { productDetail, newsletter, postProduct, updateProduct, getProducts } from "../controller/getProduct-controller.js";
import { getLogin, getUser, editProfile, userProfile, getOrderByMail, postOrders, getAllOrders, validation } from "../controller/userController.js";

const route = express.Router();
route.get('/products/:params', getProducts);
route.patch('/updateProduct/:id', updateProduct);
route.post('/newsletter', newsletter);
route.post('/postProduct', postProduct);
route.get('/productDetail/:id', productDetail);

// users
route.post('/register',getUser);
route.post('/login',getLogin);
route.get('/userProfile/:email',userProfile);
route.post('/editProfile/:email', editProfile);
route.post('/validation', validation);

// orders
route.get('/userOrders', getOrderByMail);
route.post('/postOrder', postOrders);
route.get('/orders', getAllOrders);



export {route};