var mysql = require('mysql');


var dbClient = function(host, user, password, database) {
	this.connection = mysql.createConnection({
		host: host,
		user : user,
		password: password,
		database: database
	});
	
};

dbClient.prototype.register = function(data, callback) {
	this.connection.query("INSERT INTO Registered set ?", data, 
	     function(err, result) {
			if(err) {
				callback(err, null);
			} else {
				callback(null, result);
			}
	});
};

exports.dbClient = dbClient;