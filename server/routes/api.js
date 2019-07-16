const express = require('express');
const router = express.Router();
var fs = require('fs');

var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;




// get API listing
router.get('/', (req, res) => {
    res.send('api works');
});



//Connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
var db;
MongoClient.connect('mongodb+srv://Pelix-Ng:tB776773@pequizcluster-ndlzr.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
}, (err, database) => {
    if (err) return console.log(err);
    db = database.db('PeQuizDB');
});



// route middleware that will happen on every request
router.use(function (req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

// Get all posts
router.route('/users/').get(function (req, res) {
    db.collection('User').find().toArray((err, results) => { res.send(results) });
});



// register new user
//called for any requests passed onto this 'router' object, req.body contains the data.
router.route('/users/').post(function (req, res) {

    fs.readFile('src/assets/images/pfp_placeholder.png', 'utf8', function (err, contents) {

        pfpPlaceHolder = (Buffer.from(contents).toString('base64'));

        var reqMsg = req.body;
        reqMsg["profile_picture"] = pfpPlaceHolder;
        console.log(reqMsg["password"])

        bcrypt.hash(reqMsg["password"], BCRYPT_SALT_ROUNDS, function(err, hash) {
            console.log(reqMsg["password"])
            reqMsg["password"] = hash;
            db.collection('User').insertOne(reqMsg, (err, results) => {
                if (err) return console.log(err);
                console.log('saved to database');
                res.send(results);
        });
    });
    });
});







module.exports = router;

