
var uservalidator;

$(document).ready(function() {
	uservalidator = $("#adduserform").validate({
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

$(function () {
	$("#usertable").DataTable();
	$("#globalapis").DataTable();
	$("#localapis").DataTable();
});

function onUserAdd( id )
{
	uservalidator.resetForm();
	$('#isAdmin').prop('checked', false);
	$('#isGrad').prop('checked', false);
	document.getElementById("adduserform").reset();
	$('#modaltitle').text('Add User');
	$('#user-form-modal').modal('show');
	$('#method').val('add');
}

function onSubmitUserAdd ()
{
	var firstname       = $('#firstname').val();
	var lastname		= $('#lastname').val();
	var emailid			= $('#emailid').val();
	var photoid			= $('#photoid').val();
	var isGrad			= document.getElementById("isGrad").checked;
	var isAdmin			= document.getElementById("isAdmin").checked;
	var password		= $('#password').val();
	var sendalert		= document.getElementById("sendalert").checked;

	/* add method */
	var url = "/adduser";
	var method = $('#method').val();
	if (method === 'update')
		url = "/updateuser";
	$.post(url, 
		{'firstname':firstname, 'lastname':lastname, 'emailid':emailid, 'photoid':photoid, 'isGrad':isGrad, 'isAdmin':isAdmin, 'password':password, 'sendalert':sendalert}, 
		function(result){
                if( result.status )
                {
					$('#user-form-modal').modal('hide');  
                    window.location.reload();
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onUserEdit (id)
{
	uservalidator.resetForm();
	$('#modaltitle').text('Update User');

	$('#method').val('update');
	var url = "/getuser";
	$.get(url, {'id':id}, 
		function(result){
                if( result.status )
                {
					$('#firstname').val(result.data.firstname);
					$('#lastname').val(result.data.lastname);
					$('#emailid').val(result.data.emailid);
					$('#photoid').val(result.data.photoid);
					$('#password').val(result.data.password);
					if (result.data.isAdmin) $('#isAdmin').prop('checked', true); else $('#isAdmin').prop('checked', false);
					if (result.data.isGrad) $('#isGrad').prop('checked', true); else $('#isGrad').prop('checked', false);
					if (result.data.sendalert) $('#sendalert').prop('checked', true); else $('#sendalert').prop('checked', false);
					$('#confirm_password').val(result.data.password);
					$('#user-form-modal').modal('show');
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onUserDelete (id)
{
	var url = "/deleteuser";
	$.post(url, {'id':id}, 
		function(result){
                if( result.status )
                {
					window.location.reload();
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}