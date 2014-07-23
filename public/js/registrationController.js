

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
	            badgeName: $('#badge-name').val()
	    };
	    rc.register(payload, function(data) {
	    	//alert(data);
	    });
	});

	$(document).on('click', '#btn-registration-alert', function(event) {
		event.preventDefault();
		$(this).parent().css('display','none');
		location.reload();
	});
});	