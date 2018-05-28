var express = require("express");
var router = express.Router();
var promise = require('bluebird');
var bcrypt = require('bcryptjs')

var options = {
    promiseLib : promise
}
var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/rpg';
//might need to change database name in order to merge
var db = pgp(connectionString);
var bodyParser = require('body-parser');

exports.database = db;