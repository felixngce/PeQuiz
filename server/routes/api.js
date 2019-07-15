const express = require('express');
const router = express.Router();
// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
// get API listing
router.get('/', (req, res) => {
res.send('api works');
});


   
//Connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
var db;
MongoClient.connect('mongodb+srv://Pelix-Ng:tB776773@pequizcluster-ndlzr.mongodb.net/test?retryWrites=true&w=majority', {
useNewUrlParser: true }, (err, database) => {
 if (err) return console.log(err);
 db = database.db('PeQuizDB');
});

// Get all posts
router.route('/users/').get(function(req, res) {
    db.collection('User').find().toArray( (err, results) =>
   {res.send(results)});
   });
   


// register new user
router.route('/users/').post(function (req, res) {
 db.collection('User').insertOne(req.body, (err, results) => {
 if (err) return console.log(err);
 console.log('saved to database');
 res.send(results);
 });
});




module.exports = router;

