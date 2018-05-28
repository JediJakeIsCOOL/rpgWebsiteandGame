var express = require("express");
var router = express.Router();
var promise = require('bluebird');
var bcrypt = require('bcryptjs')

var myDatabase = require('../util/database.js');

var db = myDatabase.database;
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended :false}));


router.get('/signup', function (req, res){
    db.any('SELECT * FROM users').then(function(data){
    res.render('signup');})
})

router.post('/signup', function(req, res){
    let username = req.body.username
    let password = bcrypt.hashSync(req.body.password,8);
    let email = req.body.email
    // default stats
    let xposition = 150;
    let yposition = 230;
    let power = 1;
    let defense = 1;
    let health = 10;
    let maxhealth = 10;
    let powerExp = 0;
    let defenseExp = 0;
    let healthExp = 2772;
    let coins = 100;
    let healingPotion = 2;
    let helmet = 0;
    let sword = 0;
    let shield = 0;
    let chainmail = 0;
    let zombieAxe = 0;
    let dragonshield = 0;
    let helmetSlot = ["", "helmet"];
    let helmetSlotIndex = 0;
    let helmetBonus = 0;
    let bodySlot = [""];
    let bodySlotIndex = 1;
    let bodyBonus = 0;
    let weaponSlot = [""];
    let weaponSlotIndex = 0;
    let weaponBonus = 0;
    let shieldSlot = [""];
    let shieldSlotIndex = 0;
    let shieldBonus = 0;
    let currentArea = "Area98_100";
    

    db.none('INSERT INTO users(username, password, email, xposition, yposition, power, defense, health, maxhealth, powerexp, defenseexp, healthexp, coins, healingpotion, helmet, sword, shield, chainmail, zombieaxe, dragonshield, helmetslot, helmetslotindex, helmetbonus, bodyslot, bodyslotindex, bodybonus, weaponslot, weaponslotindex, weaponsbonus, shieldslot, shieldslotindex, shieldbonus, currentarea) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33)', [username, password, email, xposition, yposition, power, defense, health, maxhealth, powerExp, defenseExp, healthExp, coins, healingPotion, helmet, sword, shield, chainmail, zombieAxe, dragonshield, helmetSlot, helmetSlotIndex, helmetBonus, bodySlot, bodySlotIndex, bodyBonus, weaponSlot, weaponSlotIndex, weaponBonus, shieldSlot, shieldSlotIndex, shieldBonus, currentArea]).then(function(result){
        res.redirect('/login');

        // db.any('SELECT * FROM users').then(function(data){
        //     // res.render(page to render, object to pass to the page)
        //     res.render('signup', {'signup' : data})
            
            
    })
    
})

// })

module.exports = router;