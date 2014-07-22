

function RegistrationController() {
	var controller = this;
	
	var that = this;
	
	
	this.register = function(data, callback) {
		$.ajax({
            url: "/register",
            type: "POST",
            contentType: "application/json",
            processData: false,
            crossDomain: true,
            data: JSON.stringify(data),
            complete: function (err, data) {
            	if (err.status != 200) {
            		$('#registration-error-alert').css('display','inline-block');
            	} else {
            		location.href = "/payment";
            	}
            },
        });
	}
	
	
	
}

var rc = new RegistrationController();

$(document).ready(function() {
	$('#user-submit').click(function () {
		var payload = {
				firstName: $('#first-name').val(),
	            lastName: $('#last-name').val(),
	            phoneNumber: $('#phone-number').val(),
	            emailAddress: $('#email-address').val()
	    };
	    rc.register(payload, function(data) {
	    	//alert(data);
	    });
	});
	
	$('#btn-registration-alert').click(function() {
		$('#registration-error-alert').css('display','hidden');
		location.reload();
	});
});