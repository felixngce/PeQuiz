const express = require('express');
const router = express.Router();
var fs = require('fs');






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



// Get all users
router.route('/users/').get(function (req, res) {
    db.collection('User').find().toArray((err, results) => { res.send(results) });
    
});

//Find user by id
router.route('/users/:id').get(function (req,res) {
    console.log(req.params)

    db.collection('User').find(ObjectId(req.params['id'])).toArray((err, results) => { 
        console.log("These are the results!")
        console.log(results[0].username)
        res.send(results) });
})

// register new user
router.route('/users/').post(function (req, res) {

    fs.readFile('src/assets/images/pfp_placeholder.png', 'utf8', function (err, contents) {

        pfpPlaceHolder = (Buffer.from(contents).toString('base64'));
        var time = new Date().getTime();
        var date = new Date(time);

        console.log(date.toString())

        var reqMsg = req.body;
        reqMsg["profile_picture"] = pfpPlaceHolder;
        reqMsg["quiz_privacy"] = "Friends only";
        reqMsg["date_created"] = date.toString();
        reqMsg["last_pw_change"] = null;
        reqMsg["quiz_created"] = [];
        reqMsg["friends"] = [];


        bcrypt.hash(reqMsg["password"], BCRYPT_SALT_ROUNDS, function (err, hash) {
            reqMsg["password"] = hash;
            db.collection('User').insertOne(reqMsg, (err, results) => {
                if (err) return console.log(err);
                console.log('saved to database');
                res.send(results);
            });
        });
    });
});


//authenticate user login
router.route('/authuser/').post(function (req, res2) {
    var username_or_email = req.body.username_or_email;

    var password = req.body.password;

    db.collection('User').findOne(
        {
            $or: [
                {"username": username_or_email},
                {"email": username_or_email}
            ]
            
        }, {
            password: 1,
            _id: 1

        }, function (err, result) {
            if (result == null) {
                res2.send([{ "auth": false }]
                );
                console.log()
                console.log("Can't find any user with the username");
            }
            else {
                console.log("username found");

                bcrypt.compare(password, result.password, function (err, res) {
                    if (err || res == false) {
                        res2.send([{ "auth": false }]);
                        console.log("Wrong Password Sir")
                    } else {
                        res2.send([{ "auth": true }, { "obj_id": result._id }]);
                    }
                });
            }
        });
});


//Update user's username
router.route('/users/:id').put(function (req,res){
    console.log("this is the update body")
    console.log(req.params["id"])
    console.log(req.body.username)
    db.collection('User').updateOne(
        {_id: ObjectId(req.params["id"]) },{
            
            $set: {"username": req.body.username}
        }, (err, results) => {
            if (err) return console.log(err);
            console.log('saved to database');
            res.send(results);
        }

    )
    
});








module.exports = router;

