var Offer = require('./models/offer');
var Wall = require('./models/wall');

module.exports = function (app) {

    app.get('/wall', function (req, res) {
        // Load the single view file (angular will handle the page changes on the front-end)
        res.sendfile('./public/wall.html');
    });

    app.get('*', function (req, res) {
        // Load the single view file (angular will handle the page changes on the front-end)
        res.sendfile('./public/index.html');
    });
};
