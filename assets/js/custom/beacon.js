
var beaconvalidator;

$(document).ready(function() {
	beaconvalidator = $("#addbeaconform").validate({
			rules: {
				name:					"required",
				//udid:					"required",
				//major:				"required",
				//minor:				"required",
				//ginbalid:				"required",
			},
			messages: {
				name:					"Please enter name",
				//udid:					"Please enter udid",
				//major:				"Please enter major",
				//minor:				"Please enter minor",
				//ginbalid:				"Please enter inbal ID",
			}
	});
});

$(function () {
	$('#beacontable').DataTable();
});

function onBeaconAdd( id )
{
	beaconvalidator.resetForm();
	document.getElementById("addbeaconform").reset();
	$('#modaltitle').text('Add Beacon');
	$('#beacon-form-modal').modal('show');
	$('#method').val('add');
}

function onSubmitBeaconAdd ()
{
	var name			= $('#name').val();
	var udid			= $('#udid').val();
	var major			= $('#major').val();
	var minor			= $('#minor').val();
	var ginbalid		= $('#ginbalid').val();

	if (major == '') major = 0;
	if (minor == '') minor = 0;

	/* add method */
	var url = "/addbeacon";
	var method = $('#method').val();
	if (method !== 'add')
		url = "/updatebeacon";
	$.post(url, {'id':method, 'name':name, 'udid':udid, 'major':major, 'minor':minor, 'ginbalid':ginbalid},
		function(result){
                if( result.status )
                {
					$('#beacon-form-modal').modal('hide');  
                    window.location.reload();
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onBeaconEdit (id)
{
	beaconvalidator.resetForm();

	$('#modaltitle').text('Update Beacon');
	$('#method').val(id);
	var url = "/getbeacon";
	$.get(url, {'id':id}, 
		function(result){
                if( result.status )
                {
					$('#name').val(result.data.name);
					$('#udid').val(result.data.udid);
					$('#major').val(result.data.major);
					$('#minor').val(result.data.minor);
					$('#ginbalid').val(result.data.ginbalid);
					$('#beacon-form-modal').modal('show');
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onBeaconDelete (id)
{
	var url = "/deletebeacon";
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