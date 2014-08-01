
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , domain = require('domain')
  , serverDomain = domain.create()
  , user = require('./routes/user')
  , https = require('https')
  , path = require('path')
  , crypto = require('crypto')
  , fs = require("fs");

var config     = {
		  key: fs.readFileSync('./public/resources/privatekey.pem'),
		 cert: fs.readFileSync('./public/resources/certificate.pem')
		};

var app = express();

// all environments
app.set('port', process.env.PORT || 443);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/payment', routes.payment);
app.get('/about', routes.about);
app.get('/registration', routes.registration);
app.get('/resources', routes.resources);
app.post('/register', routes.register);
app.get('/confirm', routes.confirm);

serverDomain.run(function () {
	https.createServer(config, app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
});

