var shortid= require('shortid');
var db = require('../db');
module.exports.requireSession = function ( req, res, next){
    if (!req.signedCookies.sessionId){
        let sessionId = shortid.generate();
        res.cookie('sessionId',sessionId,{
            signed:true
        }); 
        db.get('sessions').push({
            id:sessionId
        }).write();
    }
    let sessionId = req.signedCookies.sessionId;
    var items = db.get('sessions').find({id:sessionId}).get('cart').value();
    res.locals.items=items
    next();
}