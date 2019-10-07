var express = require('express');

var router = express.Router();

var controller = require ('../controller/products.controller');

var sessionMiddleware = require('../middlewares/session.middlewares');

router.get('/product',controller.products);

module.exports=router;