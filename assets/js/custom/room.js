
var roomvalidator;
var roomrequestsvalidator;

$(document).ready(function() {
	roomvalidator = $("#addroomform").validate({
			rules: {
				number:					"required",
				capacity:				"required",
				currentcount:			"required",
				locationdescription:	"required",
			},
			messages: {
				number:					"Please enter number",
				capacity:				"Please enter capacity(2 or 10)",
				currentcount:			"Please enter current count",
				locationdescription:	"Please enter location description",
			}
	});

	roomrequestsvalidator = $("#addroomrequestsform").validate({
			rules: {
				userid:					"required",
				roomid:					"required",
			},
			messages: {
				userid:					"Please enter userid",
				roomid:					"Please enter roomid",
			}
	});
});

$(function () {
	$('#roomtable').DataTable();
	$('#roomrequeststable').DataTable();
});

function onRoomAdd( id )
{
	roomvalidator.resetForm();
	document.getElementById("addroomform").reset();
	$('#modaltitle').text('Add Room');
	$('#room-form-modal').modal('show');
	$('#method').val('add');
}

function onSubmitRoomAdd ()
{
	var number			= $('#number').val();
	var capacity		= $('#capacity').val();
	var currentcount	= $('#currentcount').val();
	var locationdescription	= $('#locationdescription').val();

	if (!( capacity == 2 || capacity == 10))
	{
		 $.notify("Error : capacity should 2, 10", { position: "bottom center",  className: 'error' });
		 return;
	}

	/* add method */
	var url = "/addroom";
	var method = $('#method').val();
	if (method !== 'add')
		url = "/updateroom";
	$.post(url, 
		{'id':method, 'number':number, 'capacity':capacity, 'currentcount':currentcount, 'locationdescription':locationdescription},
		function(result){
                if( result.status )
                {
					$('#room-form-modal').modal('hide');  
                    window.location.reload();
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onRoomEdit (id)
{
	roomvalidator.resetForm();

	$('#modaltitle').text('Update Room');
	$('#method').val(id);
	var url = "/getroom";
	$.get(url, {'id':id}, 
		function(result){
                if( result.status )
                {
					$('#number').val(result.data.number);
					$('#capacity').val(result.data.capacity);
					$('#currentcount').val(result.data.currentcount);
					$('#locationdescription').val(result.data.locationdescription);
					$('#room-form-modal').modal('show');
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onRoomDelete (id)
{
	var url = "/deleteroom";
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

function onRoomrequestsAdd( id )
{
	roomrequestsvalidator.resetForm();
	document.getElementById("addroomrequestsform").reset();
	$('#modaltitle').text('Add Roomrequests');
	$('#roomrequests-form-modal').modal('show');
	$('#method').val('add');
}

function onSubmitRoomrequestsAdd ()
{
	var userid			= $('#userid').val();
	var roomid			= $('#roomid').val();

	/* add method */
	var url = "/addroomrequests";
	var method = $('#method').val();
	if (method !== 'add')
		url = "/updateroomrequests";
	$.post(url, 
		{'id':method, 'userid':userid, 'roomid':roomid},
		function(result){
                if( result.status )
                {
					$('#roomrequests-form-modal').modal('hide');  
                    window.location.reload();
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onRoomrequestsEdit (id)
{
	roomrequestsvalidator.resetForm();

	$('#modaltitle').text('Update Roomrequests');
	$('#method').val(id);
	var url = "/getroomrequests";
	$.get(url, {'id':id}, 
		function(result){
                if( result.status )
                {
					$('#userid').val(result.data.userid);
					$('#roomid').val(result.data.roomid);
					$('#roomrequests-form-modal').modal('show');
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onRoomrequestsDelete (id)
{
	var url = "/deleteroomrequests";
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