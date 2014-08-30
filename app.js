
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , domain = require('domain')
  , serverDomain = domain.create()
  , user = require('./routes/user')
  , https = require('https')
  , http = require('http')
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
function requireHTTPS(req, res, next) {
    if (!req.secure) {
        //FYI this should work for local development as well
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

app.use(requireHTTPS);
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
app.get('/schedule', routes.schedule);

serverDomain.run(function () {
	http.createServer(app).listen(80, function() {
		console.log('Express http server listening on port '+ 80); 
	});
	https.createServer(config, app).listen(app.get('port'), function(){
		console.log('Express https server listening on port ' + app.get('port'));
	});
});

