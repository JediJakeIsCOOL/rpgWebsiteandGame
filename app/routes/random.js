var express = require("express");
var router = express.Router();
var promise = require('bluebird');
var pgp = require('pg-promise')(options);
// var connectionString = 'postgres://localhost:5432/rpg';
// var db = pgp(connectionString);
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended :false}));
// var fetch = require('node-fetch');
// var request = require('request');

var options = {
    promiseLib : promise
}






module.exports = router;