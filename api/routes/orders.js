const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('./models/order');
const Product = require('./models/product');
const checkAuth = require('../middleware/check-auth');
const OrdersController = require ('../controllers/order');

// Handle incoming GET request to /orders
router.get("/", checkAuth, OrdersController.orders_get_all);
router.post('/', checkAuth, OrdersController.orders_create_order);
router.get('/:orderId', checkAuth, OrdersController.orders_get_order);
router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);
// router.get('/', checkAuth, (req, res, next) => {
//     Order.find()
//         .select('product quantity _id')
//         .exec()
//         .then(docs => {
//             res.status(200).json({
//                 count: docs.length,
//                 orders: docs.map(doc => {
//                     return {
//                         _id: doc._id,
//                         product: doc.product,
//                         quantity: doc.quantity,
//                         request: {
//                             type: 'GET',
//                             url: 'http://localhost:3000/orders/' + doc._id
//                         }
//                     }
//                 })
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 error: err
//             })
//         });
// });

// router.post('/', checkAuth, (req, res, next) => {
//     Product.findById(req.body.productId)
//         .then(product => {
//             if (!product) {
//                 return res.status(404).json({
//                     message: "Product not found"
//                 });
//             }
//             const order = new Order({
//                 _id: mongoose.Types.ObjectId(),
//                 quantity: req.body.quantity,
//                 product: req.body.productId
//             });
//             return order
//                 .save()
//                 .then(result => {
//                     console.log(result);
//                     res.status(201).json({
//                         message: 'Order stored',
//                         createOrder: {
//                             _id: result._id,
//                             product: result.product,
//                             quantity: result.quantity
//                         },
//                         request: {
//                             type: 'GET',
//                             url: 'http://localhost:3000/orders/' + result._id
//                         }
//                     });
//                 })
//                 .catch(err => {
//                     console.log(err);
//                     res.status(500).json({
//                         error: err
//                     });
//                 });
//         });
// });

// router.get('/:orderId', checkAuth, (req, res, next) => {
//     Order.findById(req.params.orderId)
//     .exec()
//     .then(order => {
//         if(!order) {
//             return res.status(404).json({
//                 message: "Order not found"
//             });
//         }
//         res.status(200).json({
//             order: order,
//             request: {
//                 type: "GET",
//                 url: "http://localhost:3000/orders"
//             }
//         });
//     })
//     .catch(err =>{
//         res.status(500).json({
//             error: err
//         });
//     });
// });

// router.delete('/:orderId', checkAuth, (req, res, next) => {
//     Order.remove({ _id: req.params.orderId })
//     .exec()
//     .then(result => {
//         res.status(200).json({
//             message: "Order deleted",
//             request: {
//                 type: "POST",
//                 url: "http://localhost:3000/orders",
//                 body: { productId: "ID", quantity: "Number" }
//             }
//         });
//     })
//     .catch(err => {
//         res.status(500).json({
//             error: err
//         });
//     });
// });

module.exports = router;