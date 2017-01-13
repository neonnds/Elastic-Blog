$(document).ready(function() {

	var commentText = "NO COMMENTS!";

	function getItems() {

		var lastItem = $('#comment-items .portfolio-item').not('#default-comment-item').last(); 

		if(lastItem.length == 0) {
			lastItem = [];
		} else {
			lastItem = ["_key", ">", $(lastItem).attr('data-id')];
		}

		var getComments = $.ajax({
			type: "POST", 
			url: '{{pages.apiGetComments.uri}}',
			data: { 
				last   : lastItem,
				key    : '{{key}}',
				limit  : 10,
				order  : ["_key", "ASC"]
			}
		});

		getComments.done(function(result) {
		
			commentText = "NO MORE COMMENTS!";

			$('#more-item p').html("VIEW MORE COMMENTS!");

			var data = result.message;

			data.forEach(function(dataItem) {

				var commentItem = $('#default-comment-item').clone();

				$(commentItem).removeAttr('id');

				$(commentItem).css('display', 'flex');

				$(commentItem).attr('data-id', dataItem._key);

 		 		var data = new Identicon(dataItem._email_hash).toString();
			
				$(commentItem).find('.comment-image').attr('src', `data:image/png;base64,${data}`);
				$(commentItem).find('.comment-block b').html(dataItem._name);
				$(commentItem).find('.comment-block i').html(dataItem._created);
				$(commentItem).find('p:last').html(dataItem._comment);	

				$('#comment-items').append(commentItem);
			});
		});

		getComments.fail(function(jqXHR, status, error) {

			$('#more-item p').html(commentText);
		});
	}

	$('#more-item').click(function() {

		getItems();
	});

	$('#comment-submit').click(function() {
		
		var comment = $('#comment-text').val();
		var name = $('#comment-name').val();
		var email = $('#comment-email').val();
		var notify = $('#notify-submit span').text();
	
		var saveComment = $.post('{{pages.apiSaveComment.uri}}', {
			'key'      : '{{key}}', 
			'comment'  : comment, 
			'name'     : name, 
			'email'    : email,
			'notify'   : notify
		});

		saveComment.success(function(result) {

			arrayIntoUL($("#verify-message"), ["Check your email and enter the pin to comment!"]);

			$('#verify-window').show();
		});

		saveComment.error(errorHandler);
	});

	$('#notify-submit').click(function() {

		var state = $('#notify-submit span').text();

		if(state == "OFF") {
			$('#notify-submit span').text("ON");
		} else {
			$('#notify-submit span').text("OFF");	
		}
	});
});
