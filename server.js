// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
let socketIO = require('socket.io');


// Get our API routes
const api = require('./server/routes/api');
const app = express();
const cors = require('cors');
app.use(cors());
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
// Set our api routes
app.use('/api', api);
// Catch all other routes and return the index file
app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, 'dist/index.html'));
});
/**
* Get port from environment and store in Express.
*/
const port = process.env.PORT || '3000';
app.set('port', port);
/**
* Create HTTP server.
*/
const server = http.createServer(app);
/**

* Listen on provided port, on all network interfaces.
*/


const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
var db;
MongoClient.connect('mongodb+srv://Pelix-Ng:tB776773@pequizcluster-ndlzr.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
}, (err, database) => {
    if (err) return console.log(err);
    db = database.db('PeQuizDB');
});




server.listen(port, () => console.log(`API running on localhost:${port}`));


var io = socketIO(server);

io.on('connection', (socket) => {
    console.log('user connected SOCKET.IO');
    socket.on('host-create-room', function(data){
        console.log(data)
        console.log("above shows the host-create-room event works")
        data["game-live"] = false;
        data["player"] = [];
        var gamePin = Math.floor(Math.random()*900000) + 100000; //new pin for game
        data["game_pin"] = gamePin;


        db.collection('Session').insertOne(data, (err, results) => {
            if (err) return console.log(err);
            console.log('session data is saved to db');

            db.collection('Session').findOne({'host_id': data.host_id},
            function (err, result) {
                socket.join(data.game_pin)

                socket.emit("getSessionData", result)
                console.log(result)
                console.log('Game Created with pin:', data.game_pin); 
            })
        });



    })

    socket.on('host-disconnect',function(data){
        console.log('host is disconnecting')
        console.log(data)
        socket.leave(data.game_pin)
        //delete this data off the db
        db.collection('Session').deleteOne(
            { _id: ObjectId(data._id) }, {
    
    
            }, (err, results) => {
                if (err) return console.log(err);
                console.log('deleted off database');
            }
    
        )
    })
});



