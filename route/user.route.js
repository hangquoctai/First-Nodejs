var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller');
var validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middlewares');
var multer = require('multer');
var upload = multer({ dest: './public/uploads/' })

router.get('/',authMiddleware.requireAuth, controller.index);

router.get('/cookie', function (req, res, next) {
    res.cookie('user-id', 12345)
    res.send('Hello');
})

router.get('/search', controller.search);

router.get('/create', controller.createPage);

router.get("/:id", controller.find);

router.post('/create',
    upload.single('avatar'),
    validate.postCreate,
    controller.create
);


module.exports = router;