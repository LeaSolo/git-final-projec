
const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');
const verifyJWT = require("../middleware/verifyJWT");
//const verifyAdmin = require('../middleware/verifyAdmin');

router.get('/',productController.getProducts);


router.get('/:id', productController.getProductById);


router.post('/createproduct',verifyJWT ,productController.createProduct);


router.put('/:id',verifyJWT,  productController.updateProduct);

router.delete('/:id',verifyJWT,productController.deleteProduct);

module.exports = router;
