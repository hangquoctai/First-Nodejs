const db = require('../db');
module.exports.products = function (req, res) {
    var sessionId=req.signedCookies.sessionId;
    var page=parseInt(req.query.page ) || 1;
    var perPage=8;
    var drop = (page-1)*perPage;
    res.render('products/product',{
        products:db.get('products').drop(drop).take(8).value()
    });
}