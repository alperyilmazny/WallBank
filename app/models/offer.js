// load the things we need
var mongoose = require('mongoose');

// define model =================
module.exports = mongoose.model('Offer', {
    offer : {
        id : String,
        status : String,
        name : String,
        header : String,
        body : String,
        redirectUrl : String,
        imageUrl : String
    }
});
