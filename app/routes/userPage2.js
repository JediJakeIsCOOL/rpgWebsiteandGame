var express = require("express");
var router = express.Router();

var myDatabase = require('../util/database.js');

var db = myDatabase.database;

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}));
var fetch = require('node-fetch');
var request = require('request');

// Used to load user page twice to have user name show up
router.get('/userPage',function(req,res){
    var user = "Guest"
    
        try {
            user= req.user.username
        }
        catch(err) {
            console.log(err);
        }
    
    db.any('SELECT * FROM users').then(function(data){

        // res.render(page to render, object to pass to the page)
        res.render('userPage',{
            pageTitle: "User's Page",

            
            user : user
            
        });
    })
    res.redirect('/')
    
})


module.exports = router;
