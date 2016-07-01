$(document).ready(function() {

	$('#default-load-select').hide();

	function getItems() {

		$('#load-select').remove();

		var loadSelect = $('#default-load-select').clone();

		$(loadSelect).attr("id", 'load-select');

		$(loadSelect).children().remove();

		$('#default-load-select').after(loadSelect);

		$(loadSelect).show();

		var type = $('#load-type').val();

		var getItems = $.ajax({
			type: "POST",
			url: '{{pages.apiGetMany.uri}}',
			data: {
				last  : '',
				group : type,
				limit : 1000,
				sort  : "key:desc"
			}
		});

		getItems.done(function(result) {

			var message = result.message;

			if(message.length == 0) {

				var item = $('#default-load-select-item').clone();	

				$(item).removeAttr('id');
				$(item).text("NO ITEMS FOUND!");

				$('#load-select').append(item);

				$('#load-submit-button').hide();

				return;
			}

			for(var i = 0; i < message.length; i++) {
				var item = $('#default-load-select-item').clone();	

				$(item).attr('value', message[i].id);
				$(item).removeAttr('id');
				$(item).text(message[i].id);

				$('#load-select').append(item);
			}
		});

		getItems.fail(errorHandler);

		$('#load-window').show();
	}

	$('#load-button').click(function() {
		getItems();
	});

	$("#load-type").change(function() {
		getItems();
	});

	$('#load-submit-button').click(function() {

		var id = $('#load-select').val();

		window.location.replace("{{pages.updatePost.base}}/" + id);	
	});

	$('#save-button').click(function() {

		var group = $('#group').val();
		var id = $('#id').val();
		var content = $('#content').val();
		var isLive = false;

		if($('#public-button').text() == 'PRIVATE') {
			isLive = true;
		}
	
		var savePost = $.post('{{pages.apiSavePost.uri}}', {
			'id' : id, 
			'content' : content, 
			'live' : isLive, 
			'group' : group
		});

		savePost.success(function(result) {

			if(result == null || result.success == false) {

				window.location.replace("/error");

			} else {

				if(result.success == true) {

					$('#save-window').find('h4').text('Your post has been saved!');

					$('#save-close-button').click(function() {

						if(result.created == true) {
							window.location.replace("{{pages.updatePost.base}}/" + id);	
						}
					});
				}
			}
		});

		savePost.error(errorHandler);
	});

	$('#public-button').click(function() {

		if($(this).text() == "PUBLIC") {
	
			$(this).text("PRIVATE");

		} else {

			$(this).text("PUBLIC");
		}
	});

	{{#compare pages.updatePost.uri "==" page.uri}}

		$('#delete-button').click(function() {

			console.log('deleting...');

			$('#delete-window').show();
		});

		$('#delete-submit-button').click(function() {

			var id = $('#id').val();

			var deletePost = $.post('{{pages.apiDeleteById.uri}}', {
				'id' : id, 
				'index' : 'posts', 
				'type' : 'post'
			});

			deletePost.success(function(result) {

				if(result == null || result.success == false) {

					window.location.replace("{{pages.home.uri}}");

				} else {

					if(result.success == true) {

						window.location.replace('{{pages.home.uri}}');	
					}
				}
			});

			deletePost.error(errorHandler);
		});
		
	{{/compare}}

	function convertText() {

		var contentText = $('#content').val();

		$('#preview').height($('#content').height());

		if(contentText && contentText == last) {
			return; 
		}

		last = contentText;

		var startTime = new Date() * 1;	

		var previewHTML = rho.toHtml(contentText);
		
		var endTime = new Date() * 1;

		processing_time = endTime - startTime;

		var count = 0;

		$('#preview').html(previewHTML);
	}

	$('#content').bind( 'keyup', function(e) {
		clearTimeout(convertTextTimer);
		defer_time = Math.min(processing_time, max_delay);
		convertTextTimer = setTimeout(convertText, defer_time);
	}).focus();

	convertText();
});
