// load the things we need
var mongoose = require('mongoose');

// define model =================
module.exports = mongoose.model('Wall' , {
    wall : {
        id : String,
        status : String,
        name : String,
        offers : [],
        offerIds : []
    }
});
