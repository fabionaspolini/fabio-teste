
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/expose/:dir/:name', routes.expose);

// JSON API
app.get('/api/name', api.name);

var Beer = require("./controllers/api/beers");

var cb = function (err, data, res) {
    var msg = {};
    if (err) {
        msg = { 'Erro: ': err };
    }
    else {
        msg = data;
    }
    console.log(msg);
    res.json(msg);
}

/* GET users listing. */
app.get('/api/beers', function (req, res) {
    Beer.retrieve(req, res, cb);
});

app.get('/api/beers/:id', function (req, res) {
    Beer.findOne(req, res, cb);
});

app.post('/api/beers', function (req, res) {
    Beer.create(req, res, cb);
});

app.put('/api/beers/:id', function (req, res) {
    Beer.update(req, res, cb);
});

app.delete('/api/beers/:id', function (req, res) {
    Beer.delete(req, res, cb);
});

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
  console.log("Ambiente: " + process.env.NODE_ENV);
});
