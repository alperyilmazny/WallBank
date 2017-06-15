// Set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var port     = process.env.PORT || 9090;
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');                         // log requests to the console (express4)
var bodyParser = require('body-parser');                // pull information from HTML POST (express4)
var methodOverride = require('method-override');        // simulate DELETE and PUT (express4)

var configDB = require('./config/database.js');

// Configuration =================
mongoose.connect(configDB.url); // connect to mongoDB database

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// Launch (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);


// Define model =================
var Offer = require('./app/models/offer');
var Wall = require('./app/models/wall');


// ROUTES ===================================================================
// APIs ---------------------------------------------------------------------

//-----------------------  OFFER APIs ---------------------------//
app.get('/api/offers', function(req, res) { // Get all offers

    // use mongoose to get all offers in the database
    Offer.find(function(err, offers) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(offers); // return all offers in JSON format
    });
});

app.get('/api/find', function(req, res) { // Get offer by offer id

    var offer_id = req.param('offer_id');

    // use mongoose to get specific offer in the database
    Offer.findById({_id : offer_id}, function(err, offer) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);

        res.json(offer);
    });
});

// Create offer and send back all offers after creation
app.post('/api/offers', function(req, res) {

    // create an offer, information comes from AJAX request from Angular
    Offer.create({
        offer : req.body.offer,
        done : false
    }, function(err) {
        if (err)
            res.send(err);

        Offer.find(function(err, offers) {
            if (err)
                res.send(err);
            res.json(offers);
        });
    });
});

// Update offer
app.post('/api/offers/update', function(req, res) {
    var query = { '_id' : req.body._id };
    Offer.findOneAndUpdate(query, {$set : { offer : req.body.offer } }, { upsert : true }, function(err){
        if (err)
            return res.send(500, { error: err });

        // get and return all the offers after you create another
        Offer.find(function(err, offers) {
            if (err)
                res.send(err);
            res.json(offers);
        });
    });
});

//------------------------ Offer Walls APIs ---------------------//
app.get('/api/walls', function(req, res) {

    // use mongoose to get all walls in the database
    Wall.find(function(err, walls) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            return res.send(err);

        res.json(walls); // return all offer walls in JSON format
    });
});

// Create wall and send back all walls after creation
app.post('/api/walls', function(req, res) {

    // create a wall, information comes from AJAX request from Angular
    Wall.create({
        wall : req.body.wall,
        done : false
    }, function(err) {
        if (err)
            res.send(err);

        // get and return all the wall after you create another
        Wall.find(function(err, walls) {
            if (err)
                res.send(err);
            res.json(walls);
        });
    });
});

// Update wall
app.post('/api/walls/update', function(req, res) {
    var query = { '_id' : req.body._id };
    Wall.findOneAndUpdate(query, {$set : { wall : req.body.wall } }, { upsert : true }, function(err){
        if (err)
            return res.send(500, { error: err });

        // get and return all the walls after you create another
        Wall.find(function(err, walls) {
            if (err)
                return res.send(err);
            res.json(walls);
        });
    });
});

app.get('/api/findWall', function(req, res) {

    var wall_id = req.param('wall_id');

    // use mongoose to get specific wall in the database
    Wall.findById({_id : wall_id}, function(err, wall) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) return res.send(err);

        Offer.find({_id : { $in : wall.wall.offerIds}}, function(err, offers) {
            if (err) return res.send(err);


            for (var s of wall.wall.offers){
                var o = offers.find(function(offer){
                    return offer._id == s._id;
                });
                s.offer.name = o.offer.name;
                s.offer.status = o.offer.status;
                s.offer.redirectUrl = o.offer.redirectUrl;
                s.offer.imageUrl = o.offer.imageUrl;
                s.offer.header = o.offer.header;
                s.offer.body = o.offer.body;
            }

            res.json(wall);
        });
    });
});

// Routes ======================================================================
require('./app/routes.js')(app);

// expose app
exports = module.exports = app;