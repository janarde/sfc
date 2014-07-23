var dao = require('../database/dao.js').dbClient;



exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.payment = function(req, res) {
	res.render('payment', {title: 'Payment'});
};

exports.registration = function(req, res) {
	res.render('registration', {title: 'registration'});
};

exports.resources = function(req, res) {
	res.render('resources', {title: 'Local Resources'});
};

exports.register = function(req, res) {
	var db = new dao('localhost', 'sfc', 'sfc', 'sfc');
	var first = req.body.firstName;
	var last = req.body.lastName;
	var phone = req.body.phoneNumber;
	var email = req.body.emailAddress;
	var address = req.body.address;
	var city = req.body.city;
	var zip = req.body.zip;
	var homegroup = req.body.homeGroup;
	var badgename = req.body.badgeName;
	
    
    var data = { firstName: first, 
    		     lastName: last, 
    		     phoneNumber: phone, 
    		     email: email, 
    		     address: address,
    		     city: city,
    		     zip: zip,
    		     homegroup: homegroup,
    		     badgename: badgename
    		    };
	db.register(data, function(err, result) {
		if (err) {
			res.send({ status: "failed", message : err });
		} else {
			res.send({ status: "success", message : result.insertId });
		}
	});
}