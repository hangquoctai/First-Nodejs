const express = require('express');
const cookieParser = require('cookie-parser')
const authMiddleware = require ('./middlewares/auth.middlewares');
const app = express();
const sessionMiddleware = require ('./middlewares/session.middlewares');
app.set('view engine', 'pug');
app.set('views', './view');

const port = 3000;
const db=require('./db');
const userRoute = require('./route/user.route');
const authRoute = require('./route/auth.route');
const productsRoute = require('./route/products.route');
const cartRoute = require ('./route/cart.route');


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('Secret'));
app.use(sessionMiddleware.requireSession);

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index', {
        name: "Family"
    });
})
app.use('/users', userRoute);
app.use('/auth',authRoute);
app.use('/products',productsRoute);
app.use('/cart',cartRoute);
app.listen(port, function () {
    console.log('Server listening on port ' + port)
})