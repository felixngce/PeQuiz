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
MongoClient.connect('mongodb://localhost:27017/PeQuizDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, database) => {
    if (err) return console.log(err);
    db = database.db('PeQuizDB');
});




server.listen(port, () => console.log(`API running on localhost:${port}`));


var io = socketIO(server);
const hostSocketMap = {}; // maps socket.id -> host_id for crash cleanup

io.on('connection', (socket) => {

    socket.on('host-create-room', function (data) {
        data["game-live"] = false;
        data["player"] = [];
        data["current_question"] = 1;
        var gamePin = Math.floor(Math.random() * 900000) + 100000; //new pin for game
        data["game_pin"] = gamePin;


        // Delete any stale sessions for this host before creating a new one
        db.collection('Session').deleteMany({ 'host_id': data.host_id }, (err) => {
            if (err) return console.log(err);

            db.collection('Session').insertOne(data, (err, results) => {
                if (err) return console.log(err);

                db.collection('Session').findOne({ 'host_id': data.host_id },
                    function (err, result) {
                        hostSocketMap[socket.id] = data.host_id;
                        socket.join(result.game_pin)
                        io.to(result.game_pin).emit('getSessionData', result)
                    })
            });
        });
    })


    socket.on('get-display-name', function (data) {

        db.collection('Session').findOne({game_pin: data },function (err, results) {

            console.log(socket.rooms); // contains an object with all of the roomnames as keys and values

            io.to(data).emit("getSessionData", results)

        })
    });

    socket.on('get-new-session-data', function (data) {

        db.collection('Session').findOne({ 'host_id': data }, 
            function (err, result) {
                
            io.to(result.game_pin).emit("getting-new-session-data", result)

        })
    });


    socket.on('disconnect', function () {
        const host_id = hostSocketMap[socket.id];
        if (host_id) {
            db.collection('Session').deleteMany({ 'host_id': host_id }, (err) => {
                if (err) return console.log(err);
                console.log('Cleaned up orphaned session for host:', host_id);
            });
            delete hostSocketMap[socket.id];
        }
    })

    socket.on('game-starting', function (data) {
        io.to(data.game_pin).emit('game-starting-players', data)
    })

    socket.on('host-disconnect', function (data) {
        console.log('host is disconnecting')
        delete hostSocketMap[socket.id];
        socket.leave(data.game_pin)
        //delete this data off the db
        db.collection('Session').deleteMany(
            { _id: ObjectId(data._id) }, {


            }, (err, results) => {
                if (err) return console.log(err);
                console.log('deleted off database');
            }

        )
    })

    socket.on('player-connect', function (data) {
        console.log('player is connecting')
        db.collection('Session').findOne({ game_pin: data.game_pin }, function (err, result) {
    
            var i;
            var playerNo = result.player.length

            if (playerNo == 0) {
                console.log("there are 0 players")
                db.collection('Session').updateOne({ "game_pin": data.game_pin }, {
                    $push: {
                        "player": { 'display_name': data.display_name, 'points': 0 , 'answer': 0, 'answer_outcome':false, 'points_awarded':0 , 'game_pin': data.game_pin}
                    }
                },
                    function (err, result) {
                        if (err) return console.log(err);

                        console.log("a room was actually found")
                        socket.join(data.game_pin)
                        socket.emit('player-join-success')
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
                            "player": { 'display_name': data.display_name, 'points': 0 , 'answer': 0, 'answer_outcome':false, 'points_awarded':0 , 'game_pin': data.game_pin}
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

    socket.on('player-answered', function(data){
        io.to(data.game_pin).emit('one-player-answered', data)
    })
    function sortEggsInNest(a, b) {
        if (a > b) {
          return -1;;
        } else if (b > a) {
          return 1;;
        } else {
          return 0;
        }
      }

    socket.on('player-unsorted-list', function(data){
        data.player_list.sort(function(a,b){
            {return b.points - a.points}
        })
      
        db.collection('Session').updateOne(
            { host_id: data.host_id }, {
    
                $set: {
                    "player": data.player_list
                }
            }, (err, results) => {
                if (err) return console.log(err);
                io.to(data.player_list[0].game_pin).emit('just-player-data', data.player_list)
                io.to(data.player_list[0].game_pin).emit('show-correct-answer')
            }
    
        )
    })

    socket.on('update-current-question', function(data){
        
        db.collection('Session').updateOne({ host_id: data.host_id},{
            $set:{
                "current_question": data.new_current_question
            }
        }, (err, results) => {
            if (err) return console.log(err);
            io.to(data.game_pin).emit('current-question-updated')
        })
    })

    socket.on('player-back-to-question', function(data){
        db.collection('Session').findOne({'host_id': data},  function (err, result) { 
    
            io.to(result.game_pin).emit('to-player-question',result);
        })
    })
    



    socket.on('getStartingData', function(data){
        db.collection('Session').findOne({'game_pin': data},  function (err, result) {
            io.to(data).emit('get-starting-data', result)
            
        })
    })

    socket.on('game-finished', function(data){
        socket.leave(data)

    })

    socket.on('player-to-award', function(data){
        io.to(data).emit('go-to-award', data)
    })

    socket.on('update-quiz-plays', function(data){
        const user_quiz_field = 'quiz_created.' + data.quiz_id + '.no_of_plays'
        const new_quiz_id = data.quiz_data.no_of_plays + 1;
        const new_user_quiz_field = {};
        new_user_quiz_field[user_quiz_field] = new_quiz_id;
        console.log(user_quiz_field)
        console.log(new_quiz_id)
        console.log(new_user_quiz_field)
        db.collection('User').updateOne({_id: ObjectId(data.host_id)}, {
            $set:
                new_user_quiz_field
            
        },(err, results) => {
            if (err) return console.log(err);
        })//for db.collection
    })// for socket.on
    
});



