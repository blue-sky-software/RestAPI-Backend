$(document).ready(function() {
	// validate signup form on keyup and submit
	$("#signupform").validate({
			rules: {
				firstname: "required",
				lastname: "required",
				emailid: {
					required: true,
					email: true
				},
				photoid: "required",
				password: {
					required: true,
					minlength: 5
				},
				confirm_password: {
					required: true,
					minlength: 5,
					equalTo: "#password"
				},
			},
			messages: {
				firstname: "Please enter your firstname",
				lastname: "Please enter your lastname",
				emailid: "Please enter a valid email address",
				photoid: "Please enter a valid email address",
				password: {
					required: "Please provide a password",
					minlength: "Your password must be at least 5 characters long"
				},
				confirm_password: {
					required: "Please provide a password",
					minlength: "Your password must be at least 5 characters long",
					equalTo: "Please enter the same password as above"
				}
			}
	});
});