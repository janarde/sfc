

function RegistrationController() {
	var controller = this;
	
	var that = this;
	
	this.validatePayload = function(payload) {
		/*
		 * firstName: $('#first-name').val(),
	            lastName: $('#last-name').val(),
	            phoneNumber: $('#phone-number').val(),
	            emailAddress: $('#email-address').val(),
	            address: $('#address').val(),
	            city: $('#city').val(),
	            zip: $('#zip').val(),
	            homeGroup: $('#home-group').val(),
	            badgeName: $('#badge-name').val()
		 */
		if (payload.firstName == '') {
			message = "You must provide your first name.";
			$('#registration-error-alert').text(message);
			$('#registration-error-alert').css('display','inline-block');
			return false;
		} else if (payload.lastName == '') {
			message = "You must provide your last name.";
			$('#registration-error-alert').text(message);
			$('#registration-error-alert').css('display','inline-block');
			return false;
		} else if (payload.phoneNumber == '') {
			message = "You must provide your phone number.";
			$('#registration-error-alert').text(message);
			$('#registration-error-alert').css('display','inline-block');
			return false;
		} else if (payload.emailAddress == '') {
			message = "You must provide your email address.";
			$('#registration-error-alert').text(message);
			$('#registration-error-alert').css('display','inline-block');
			return false;
		} else if (payload.badgeName == '') {
			message = "You must provide your badge name.";
			$('#registration-error-alert').text(message);
			$('#registration-error-alert').css('display','inline-block');
			return false;
		} else if (payload.cc == '') {
			message = "You must provide your Credit Card number.";
			$('#registration-error-alert').text(message);
			$('#registration-error-alert').css('display','inline-block');
			return false;
		} else if (payload.ccv == '') {
			message = "You must provide your ccv number - The last 3 digits on the back of your card.";
			$('#registration-error-alert').text(message);
			$('#registration-error-alert').css('display','inline-block');
			return false;
		} else if (payload.expireMonth == '00') {
			message = "You must provide your Credit Card expiration month";
			$('#registration-error-alert').text(message);
			$('#registration-error-alert').css('display','inline-block');
			return false;
		} else if (payload.expireYear == '00') {
			message = "You must provide your Credit Card expiration year";
			$('#registration-error-alert').text(message);
			$('#registration-error-alert').css('display','inline-block');
			return false;
		} else if (payload.ccType == '00') {
			message = "You must provide your Credit Card Type";
			$('#registration-error-alert').text(message);
			$('#registration-error-alert').css('display','inline-block');
			return false;
		} else {
			return true;
		}
	};
	
	this.register = function(data, callback) {
		$.ajax({
            url: "/register",
            type: "POST",
            contentType: "application/json",
            processData: false,
            crossDomain: true,
            data: JSON.stringify(data),
            //error: function(jqXHR, e){
    	    //    console.log(jqXHR.responseText+' :: '+jqXHR.statusText, e);
            //},
            complete: function (data) {
            	statusObj = data.responseJSON;
            	message = "";
            	if (statusObj.status == "failed") {
            		if (statusObj.message.errno == 1062) {
            			message = "Already Registered";
            			$('#registration-error-alert').append(message);
            		}
            		
            		$('#registration-error-alert').css('display','inline-block');
            	} else {
            		location.href = "/payment";
            	}
            	console.log(data.responseJSON);
            },
        });
	}
	
	
	
}

var rc = new RegistrationController();

$(document).ready(function() {
	$('#user-submit').click(function () {
		
		var payload = {
				// order really matters here because of how we are doing the insert
				firstName: $('#first-name').val(),
	            lastName: $('#last-name').val(),
	            phoneNumber: $('#phone-number').val(),
	            emailAddress: $('#email-address').val(),
	            address: $('#address').val(),
	            city: $('#city').val(),
	            zip: $('#zip').val(),
	            homeGroup: $('#home-group').val(),
	            badgeName: $('#badge-name').val(),
	            cc: $('#cc').val(),
	            ccv: $('#ccv').val(),
	            expireMonth: $('#expire-month').val(),
	            expireYear: $('#expire-year').val(),
	            ccType: $('#cc-type').val()
	    };
		
		if (rc.validatePayload(payload)) {
			rc.register(payload, function(data) {
		    });
		}
	    
	});

	$(document).on('click', '#btn-registration-alert', function(event) {
		event.preventDefault();
		$(this).parent().css('display','none');
		location.reload();
	});
});	