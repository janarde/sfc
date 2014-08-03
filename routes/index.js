var dao = require('../database/dao.js').dbClient;
var paypal_api = require('paypal-rest-sdk');



exports.index = function(req, res){
  res.render('index', { title: 'Seattle Fall Conference' });
};

exports.payment = function(req, res) {
	res.render('payment', {title: 'Payment'});
};

exports.registration = function(req, res) {
	res.render('registration', {title: 'Registration'});
};

exports.resources = function(req, res) {
	res.render('resources', {title: 'Local Resources'});
};

exports.about = function(req, res) {
	res.render('about', {title: 'About SFC'});
};

exports.confirm = function(req, res) {
	res.render('confirm', {title: 'Registration Confirmation Page'});
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
	var cc = req.body.cc;
	var ccv = req.body.ccv;
	var expireMonth = req.body.expireMonth;
    var expireYear = req.body.expireYear;
    var ccType = req.body.ccType;
	
    
	var config_opts = {
		    'host': 'api.paypal.com',
		    'port': '',
		    'client_id': 'AQylIBBWxnN72ozlZH4alfGGHZAwgH9Rhe3SOdp02rlZONhOW5QwZfPUNia1',
		    'client_secret': 'EPtmSRB4FNMrIzspE2LFM9jsT89WbRTF3MaFYDydlmWU9xdNPz_ZfQafOnCu'
	};
	
	var create_payment_json = {
		    "intent": "sale",
		    "payer": {
		        "payment_method": "credit_card",
		        "funding_instruments": [{
		            "credit_card": {
		                "type": ccType,
		                "number": cc,
		                "expire_month": expireMonth,
		                "expire_year": expireYear,
		                "cvv2": ccv,
		                "first_name": first,
		                "last_name": last,
		                "billing_address": {
		                    "line1": address,
		                    "city": city,
		                    "state": "WA",
		                    "postal_code": zip,
		                    "country_code": "US"
		                }
		            }
		        }]
		    },
		    "transactions": [{
		        "amount": {
		            "total": "20",
		            "currency": "USD",
		            "details": {
		                "subtotal": "20",
		                "tax": "0",
		                "shipping": "0"
		            }
		        },
		        "description": "This is the payment transaction description."
		    }]
		};
	
	paypal_api.payment.create(create_payment_json, config_opts, function (err, response) {
	    if (err) {
	        console.log(err.response);
	        res.send({status: "failed", message: err.response.details[0].issue})
	    }

	    if (response) {
	        console.log("Create Payment Response");
	        console.log(response);
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
	});
	
    
}