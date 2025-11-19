const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const cartController=require("../Controller/cartController")


router.post('/',verifyJWT, cartController.addItemToCart);


router.get('/',verifyJWT,  cartController.getcart);


router.delete('/:productId', verifyJWT, cartController.removeCartItem);


router.put('/:productId', verifyJWT, cartController.updateQuantity);

module.exports = router;