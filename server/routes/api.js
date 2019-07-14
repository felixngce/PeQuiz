const express = require('express');
const router = express.Router();
// declare axios for making http requests
const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
// get API listing
router.get('/', (req, res) => {
res.send('api works');
});
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
var db;
// MongoClient.connect('mongodb+srv://Pelix-Ng:tB776773@fweb-ol14e.mongodb.net', {
// useNewUrlParser: true }, (err, database) => {
//  if (err) return console.log(err);
//  db = database.db('testone');
// });
// // insert new quote
// router.route('/quotes').post(function (req, res) {
//  db.collection('quotes').insertOne(req.body, (err, results) => {
//  if (err) return console.log(err);
//  console.log('saved to database');
//  res.send(results);
//  });
// });


module.exports = router;

