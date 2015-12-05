
var bookvalidator;
var bookrequestsvalidator;

$(document).ready(function() {
	bookvalidator = $("#addbookform").validate({
			rules: {
				name:					"required",
				//checkoutuserid:			"required",
				content:				"required",
			},
			messages: {
				name:					"Please enter name",
				//checkoutuserid:			"Please enter checkout userid",
				content:				"Please enter content",
			}
	});

	bookrequestsvalidator = $("#addbookrequestsform").validate({
			rules: {
				userid:					"required",
				bookid:					"required",
			},
			messages: {
				userid:					"Please enter userid",
				bookid:					"Please enter bookid",
			}
	});
});

$(function () {
	$('#booktable').DataTable();
	$('#bookrequeststable').DataTable();
	CKEDITOR.replace('content');
});

function onBookAdd( id )
{
	bookvalidator.resetForm();
	CKEDITOR.instances['content'].setData('');
	document.getElementById("addbookform").reset();
	$('#modaltitle').text('Add book');
	$('#book-form-modal').modal('show');
	$('#method').val('add');
}

function onSubmitBookAdd ()
{
	var name			= $('#name').val();
	var available		= document.getElementById("available").checked;
	var checkoutuserid	= $('#checkoutuserid').val();
	var content			= $('#content').val();

	/* add method */
	var url = "/addbook";
	var method = $('#method').val();
	if (method !== 'add')
		url = "/updatebook";
	$.post(url, 
		{'id':method, 'name':name, 'available':available, 'checkoutuserid':checkoutuserid, 'content':content},
		function(result){
                if( result.status )
                {
					$('#book-form-modal').modal('hide');  
                    window.location.reload();
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onBookEdit (id)
{
	bookvalidator.resetForm();
	CKEDITOR.instances['content'].setData('');
	$('#modaltitle').text('Update book');
	$('#method').val(id);
	var url = "/getbook";
	$.get(url, {'id':id}, 
		function(result){
                if( result.status )
                {
					$('#name').val(result.data.name);
					if (result.data.available) $('#available').prop('checked', true); else $('#available').prop('checked', false);
					$('#checkoutuserid').val(result.data.checkoutuserid);
					CKEDITOR.instances['content'].setData(result.data.content);
					$('#book-form-modal').modal('show');
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onBookDelete (id)
{
	var url = "/deletebook";
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

function onBookrequestsAdd( id )
{
	bookrequestsvalidator.resetForm();
	document.getElementById("addbookrequestsform").reset();
	$('#modaltitle').text('Add bookrequests');
	$('#bookrequests-form-modal').modal('show');
	$('#method').val('add');
}

function onSubmitBookrequestsAdd ()
{
	var userid			= $('#userid').val();
	var bookid			= $('#bookid').val();

	/* add method */
	var url = "/addbookrequests";
	var method = $('#method').val();
	if (method !== 'add')
		url = "/updatebookrequests";
	$.post(url, 
		{'id':method, 'userid':userid, 'bookid':bookid},
		function(result){
                if( result.status )
                {
					$('#bookrequests-form-modal').modal('hide');  
                    window.location.reload();
                }
                else
                {
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onBookrequestsEdit (id)
{
	bookrequestsvalidator.resetForm();

	$('#modaltitle').text('Update bookrequests');
	$('#method').val(id);
	var url = "/getbookrequests";
	$.get(url, {'id':id},
		function(result){
                if( result.status )
                {
					$('#userid').val(result.data.userid);
					$('#bookid').val(result.data.bookid);
					$('#bookrequests-form-modal').modal('show');
                }
                else
                {                     
                    $.notify("Error : " + result.reason, { position: "bottom center",  className: 'error' });
                }
        });
}

function onBookrequestsDelete (id)
{
	var url = "/deletebookrequests";
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