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

    socket.on('host-create-room', function (data) {
        console.log(data)
        console.log("above shows the host-create-room event works")
        data["game-live"] = false;
        data["player"] = [];
        data["current_question"] = 1;
        var gamePin = Math.floor(Math.random() * 900000) + 100000; //new pin for game
        data["game_pin"] = gamePin;


        db.collection('Session').insertOne(data, (err, results) => {
            if (err) return console.log(err);
            console.log('session data is saved to db');

            db.collection('Session').findOne({ 'host_id': data.host_id },
                function (err, result) {
                    socket.join(result.game_pin)
                    console.log('this is the room the host joined')
                    console.log(result.game_pin)


                    socket.emit("getSessionData", result)
                    console.log("these are the huh???results")
                    console.log(result)
                    console.log('Game Created with pin:', result.game_pin);
                })
        });



    })
    //So this is wrong...
    socket.on('get-display-name', function (data) {
        console.log("this should be the pin")
        console.log(data)
        db.collection('Session').findOne({game_pin: data },function (err, results) {
            console.log("These should be the results..")
            console.log(results)
            console.log("you should see the room here")

            console.log(socket.rooms); // contains an object with all of the roomnames as keys and values

            io.to(data).emit("getSessionData", results)

        })
    });

    socket.on('get-new-session-data', function (data) {
        console.log("this should be the pinnnnnnnnnnnnn")
        console.log(data)
        db.collection('Session').findOne({ 'host_id': data }, 
            function (err, result) {
                
            console.log("These should be the results.....")
            console.log(err)
            console.log(result)
            console.log("you should see the room here")
            console.log(socket.rooms); // contains an object with all of the roomnames as keys and values

            io.to(result.game_pin).emit("getting-new-session-data", result)

        })
    });


    socket.on('disconnect', function (data) {
    })

    socket.on('game-starting', function (data) {
        io.to(data.game_pin).emit('game-starting-players', data)
    })

    socket.on('host-disconnect', function (data) {
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

    socket.on('player-connect', function (data) {
        console.log('player is connecting')
        console.log(data)
        db.collection('Session').findOne({ game_pin: data.game_pin }, function (err, result) {
            console.log("this is the resultsff")
            console.log(result)
            var i;
            var playerNo = result.player.length
            console.log("This is the length of the player array")
            console.log(playerNo)
            if (playerNo == 0) {
                console.log("there are 0 players")
                db.collection('Session').updateOne({ "game_pin": data.game_pin }, {
                    $push: {
                        "player": { 'display_name': data.display_name, 'points': 0 }
                    }
                },
                    function (err, result) {
                        if (err) return console.log(err);

                        console.log("a room was actually found")
                        socket.join(data.game_pin)
                        socket.emit('player-join-success')
                        socket.emit
                    })
            }
            else {
                var counter = 0;


                for (i = 0; i < playerNo; i++) {
                    if (data.display_name != result.player[i].display_name) {
                        counter += 1;

                    }
                }
                //If there aren't matching display names
                if (counter == playerNo) {
                    console.log("there aren't any matching display names")
                    db.collection('Session').updateOne({ "game_pin": data.game_pin }, {
                        $push: {
                            "player": { 'display_name': data.display_name, 'points': 0 }
                        }
                    },
                        function (err, result) {
                            if (err) return console.log(err);

                            console.log("a room was actually found and u aren't the 1st player")
                            socket.join(data.game_pin)
                            socket.emit('player-join-success')
                        })

                }
                else {
                    socket.emit("display_name_taken")
                }
            }



        })
    });

    socket.on('go-to-answering', function (data) {
        io.to(data).emit('player-to-answering', data)


    })
});



