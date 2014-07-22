
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , domain = require('domain')
  , serverDomain = domain.create()
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
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
app.get('/registration', routes.registration);
app.get('/resources', routes.resources);
app.post('/register', routes.register);

serverDomain.run(function () {
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});
});

