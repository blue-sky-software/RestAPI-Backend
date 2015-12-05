
var alertsvalidator;

$(document).ready(function() {
	alertsvalidator = $("#addalertsform").validate({
			rules: {
				userid:					"required",
				type:					"required",
			},
			messages: {
				userid:					"Please enter userid",
				type:					"Please enter type",
			}
	});
});

$(function () {
	$('#alertstable').DataTable();
});

function onAlertsAdd( id )
{
	alertsvalidator.resetForm();
	document.getElementById("addalertsform").reset();
	$('#modaltitle').text('Add Alerts');
	$('#alerts-form-modal').modal('show');
	$('#method').val('add');
}

function onSubmitAlertsAdd ()
{
	var userid			= $('#userid').val();
	var type			= $('#type').val();
	var description		= $('#description').val();
	var bookid			= $('#bookid').val();
	var locationtype	= $('#locationtype').val();
	var locationmessage	= $('#locationmessage').val();

	var parameter;
	
	if (!(type == 1 || type == 0))
	{
		$.notify("Error : type should 0(book), 1(location)", { position: "bottom center",  className: 'error' });
		return;
	}

	if (type == 0)
	{
		if (bookid == '' || description == '')
		{
			$.notify("Error : please enter bookid, description", { position: "bottom center",  className: 'error' });
			return;
		}
		parameter = {'id':method, 'userid':userid, 'type':type, 'bookid':bookid, 'description':description};
	}
	else
	{
		if (locationtype == '' || locationmessage == '')
		{
			$.notify("Error : please enter locationtype, locationmessage", { position: "bottom center",  className: 'error' });
			return;
		}
		if (!(locationtype == 1 || locationtype == 0))
		{
			$.notify("Error : locationtype should 0(construction), 1(workshop)", { position: "bottom center",  className: 'error' });
			return;
		}
		parameter = {'id':method, 'userid':userid, 'type':type, 'locationtype':locationtype, 'locationmessage':locationmessage};
	}

	/* add method */
	var url = "/addalerts";
	var method = $('#method').val();
	if (method !== 'add')
		url = "/updatealerts";
	$.post(url, 
		parameter,
		function(result){
                if( result.status )
                {
					$('#alerts-form-modal').modal('hide');  
                    window.location.reload();
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onAlertsEdit (id)
{
	alertsvalidator.resetForm();

	$('#modaltitle').text('Update Alerts');
	$('#method').val(id);
	var url = "/getalerts";
	$.get(url, {'id':id}, 
		function(result){
                if( result.status )
                {
					$('#userid').val(result.data.userid);
					$('#type').val(result.data.type);
					$('#description').val(result.data.description);
					$('#bookid').val(result.data.bookid);
					$('#locationtype').val(result.data.locationtype);
					$('#locationmessage').val(result.data.locationmessage);
					$('#alerts-form-modal').modal('show');
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onAlertsDelete (id)
{
	var url = "/deletealerts";
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