var mysql = require('mysql');


var dbClient = function(host, user, password, database) {
	this.connection = mysql.createConnection({
		host: host,
		user : user,
		password: password,
		database: database
	});
	
	this.connection.connect(function(err) {              // The server is either down
	    if(err) {                                     // or restarting (takes a while sometimes).
	      console.log('error when connecting to db:', err);
	      setTimeout(dbClient, 2000); // We introduce a delay before attempting to reconnect,
	    }                                     // to avoid a hot loop, and to allow our node script to
	  });                                     // process asynchronous requests in the meantime.
	                                          // If you're also serving http, display a 503 error.
	this.connection.on('error', function(err) {
	    console.log('db error', err);
	    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
	    	dbClient();                         // lost due to either server restart, or a
	    } else {                                      // connnection idle timeout (the wait_timeout
	      throw err;                                  // server variable configures this)
	    }
	  });
	
};

dbClient.prototype.register = function(data, callback) {
	this.connection.query("INSERT INTO Registered set firstname = ?," +
			" lastname = ?, "+
			" phonenumber = ?," +
			" email = ?," +
			" address = ?," +
			" city = ?," +
			" zip = ?," +
			" HomeGroup = ?," +
			" BadgeName = ?", 
			[ data.firstName, data.lastName, data.phoneNumber, data.email, data.address,
			  data.city, data.zip, data.homegroup, data.badgename ], 
	     function(err, result) {
			if(err) {
				callback(err, null);
			} else {
				callback(null, result);
			}
	});
};

exports.dbClient = dbClient;