var express = require("express");
var router = express.Router();
var promise = require('bluebird');
var bcrypt = require('bcryptjs')

var connectionString = 'postgres://localhost:5432/rpg';
//might need to change database name in order to merge
var myDatabase = require('../util/database.js');

var db = myDatabase.database;

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended :false}));

router.post('/characterStats', function (req, res) { // Creates an API so that our front end can access our database
    let user = req.user.username;

    db.any(`SELECT * FROM users WHERE (username = '${user}')`).then(function (userData) {
        res.json({'userData': userData});
    })
})

router.post('/highscorePower', function (req, res) { // Creates an API so that our front end can access our database 

    db.any(`SELECT * FROM users ORDER BY powerexp desc`).then(function (powerStats) {
        res.json({'powerStats': powerStats});
        
    })
})

module.exports = router;