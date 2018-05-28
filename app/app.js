// import { TIMEOUT } from 'dns';

// ### Dependencies ###
var express = require('express');
var app = express();
var promise = require('bluebird');
var bodyParser = require('body-parser');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const bcrypt = require('bcryptjs');
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var options = {
  promiseLib : promise
}
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/rpg';
//might need to change database name in order to merge
var db = pgp(connectionString);

app.use(require("./routes/random"));

app.use(require("./routes/login"))
app.use(require("./routes/signup"))
app.use(require("./routes/userPage"))
app.use(require('./routes/logout'))
app.use(require('./routes/enemies'))
app.use(require('./routes/highscores'))
app.use(require('./routes/screenshots'))
app.use(require('./routes/howtoplay'))
app.use(require("./routes/api"))
app.use(require("./routes/userPage2"))

app.set('view engine', 'ejs');
app.set('views', 'views');

var path = require('path')



app.use(express.static(__dirname + '/../game/'));

app.get('/play', function (req, res) {
    // res.sendFile(__dirname + '/../game/index.html')
    res.sendFile(path.resolve('../game/index.html'));
  });


  function playerstats (data) {
    var user = data.username;
    var powerLv = data.power;
    var defenseLv = data.defense;
    var healthLv = data.health;
    var maxhealth = data.maxhealth;
    var powerExp = data.powerExp;
    var defenseExp = data.defenseExp;
    var healthExp = data.healthExp;
    var coins = data.coins;
    var healingPotion = data.healingPotion;
    var helmet = data.helmet;
    var sword = data.sword;
    var shield = data.shield;
    var chainmail = data.chainmail;
    var zombieAxe= data.zombieAxe;
    var dragonShield= data.dragonShield;
    var helmetSlot= data.helmetSlot;
    var helmetSlotIndex= data.helmetSlotIndex;
    var helmetBonus= data.helmetBonus;
    var bodySlot= data.bodySlot;
    var bodySlotIndex= data.bodySlotIndex;
    var bodyBonus= data.bodyBonus;
    var weaponSlot= data.weaponSlot;
    var weaponSlotIndex= data.weaponSlotIndex;
    var weaponBonus= data.weaponBonus;
    var shieldSlot= data.shieldSlot;
    var shieldSlotIndex= data.shieldSlotIndex;
    var shieldBonus= data.shieldBonus;
    var currentArea = data.currentArea;
    // console.log("Node test", data);
    // console.log("Power exp", data.powerExp)
    
    db.any('UPDATE users SET power = $2, defense = $3, health = $4, maxhealth = $5, powerexp = $6, defenseexp = $7, healthexp = $8, coins = $9, healingpotion = $10, helmet = $11, sword = $12, shield = $13, chainmail = $14, zombieaxe = $15, dragonshield = $16, helmetslot = $17, helmetbonus = $18, bodyslot = $19, bodybonus = $20, weaponslot = $21, weaponsbonus = $22, shieldslot = $23, shieldbonus = $24, currentarea = $25, weaponslotindex = $26, helmetslotindex = $27, bodyslotindex = $28, shieldslotindex = $29 WHERE username = $1', [user, powerLv, defenseLv, healthLv, maxhealth, powerExp, defenseExp, healthExp, coins, healingPotion, helmet, sword, shield, chainmail, zombieAxe, dragonShield, helmetSlot, helmetBonus, bodySlot, bodyBonus, weaponSlot, weaponBonus, shieldSlot, shieldBonus, currentArea, weaponSlotIndex, helmetSlotIndex, bodySlotIndex, shieldSlotIndex]).catch(function(err){
      console.log(err);
  });
  };



   io.on('connection', function (socket) {

    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
        });
      
    socket.on('playerStats', playerstats);
    // socket.on("players", onNewplayer);
    
 
 });




server.listen(3003, function () {
  console.log(`Listening on ${server.address().port}`);
});