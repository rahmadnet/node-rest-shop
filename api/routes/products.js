const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


const Product = require('./models/product');
const ProductsControllerr = require('../controllers/products');

router.get('/', ProductsControllerr.products_get_all);
router.post('/', checkAuth, upload.single('productImage'), ProductsControllerr.products_create_products);
router.get('/:productId', ProductsControllerr.products_get_product);
router.patch('/:productId', checkAuth, ProductsControllerr.product_update_products);
router.delete('/:productId', checkAuth, ProductsControllerr.products_delete_products);


    router.patch('/:productId', checkAuth, (req, res, next) => {
        const id = req.params.productId;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Product.update({
                _id: id
            }, {
                $set: updateOps
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Product update',
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + id
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    });

    // router.delete('/:productId', checkAuth, (req, res, next) => {
    //     const id = req.params.productId;
    //     Product.remove({
    //             _id: id
    //         })
    //         .exec()
    //         .then(result => {
    //             res.status(200).json({
    //                 message: 'Product delete',
    //                 request: {
    //                     type: 'POST',
    //                     url: 'http://localhost:3000/products/' + id,
    //                     body: {
    //                         name: 'String',
    //                         price: 'Number'
    //                     }
    //                 }
    //             })
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             res.status(500).json({
    //                 error: err
    //             })
    //         });
    // });

module.exports = router;