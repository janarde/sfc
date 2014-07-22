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
	var data = { firstName: first, lastName: last, phoneNumber: phone, address: email};
	db.register(data, function(err, result) {
		if (err) {
			res.send(err, null);
		} else {
			res.send(null, result.insertId);
		}
	});
}