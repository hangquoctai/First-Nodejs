const md5 = require('md5');
const shortid=require('shortid')
const db = require('../db');
module.exports.login = function (req, res) {
    res.render('auth/login');
}
module.exports.postLogin = function(req,res){
    var mail = req.body.mail;
    var password = req.body.password;
    var user = db.get("users").find({mail : mail}).value();

    if(!user){
        res.render('auth/login',{
            errors:[
                'Users does not exist'
            ],
            values:req.body
        });
        return;
    }
    if(user.password!==password){
        res.render('auth/login',{
            errors:[
                'Wrong Password'
            ],
            values:req.body
        });
    }
    res.cookie('userId',user.id,{
        signed:true
    });
    res.redirect('/users');
}