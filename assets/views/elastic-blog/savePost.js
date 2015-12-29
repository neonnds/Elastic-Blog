$(document).ready(function() {

	$('#default-load-select').hide();

	function getItems() {

		$('#load-submit-button').show();
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
				index : 'posts',
				type  : 'post',
				group : type,
				limit : 1000
			}
		});

		getItems.done(function(result) {
			console.log(result);

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

				$(item).attr('value', message[i].uri);
				$(item).removeAttr('id');
				$(item).text(message[i].uri);

				$('#load-select').append(item);
			}
		});

		getItems.fail(errorHandler);

		$('#load-lightbox').show();
	}

	$("#load-type").change(function() {
		getItems();
	});

	$('#load-button').click(function() {
		getItems();
	});

	$('#load-cancel-button').click(function() {
		$('#load-lightbox').hide();
	});

	$('#load-submit-button').click(function() {

		var uri = $('#load-select').val();

		window.location.replace("{{pages.updatePost.base}}/" + uri);	
	});

	$('#save-button').click(function() {

		var group = $('#group').val();
		var uri = $('#uri').val();
		var content = $('#content').val();

		var isLive = false;

		if($('#live-button').hasClass('blog-button-active') == true) {
			isLive = true;
		}
	
		var savePost = $.post('{{pages.apiSavePost.uri}}', {
			'uri' : uri, 
			'content' : content, 
			'live' : isLive, 
			'group' : group
		});

		savePost.success(function(result) {

			if(result == null || result.success == false) {

				window.location.replace("/error");

			} else {

				if(result.success == true) {

					$('#save-lightbox').show();

					$('#save-close-button').click(function() {
						window.location.replace("{{pages.updatePost.base}}/" + uri);	
					});
				}
			}
		});

		savePost.error(errorHandler);
	});

	$('#live-button').click(function() {

		if($('#live-button').hasClass('blog-button-active') == true) {
	
			$(this).removeClass('blog-button-active');

		} else {

			$(this).addClass('blog-button-active');
		}
	});

	{{#compare pages.updatePost.uri "==" page.uri}}

		$('#delete-button').click(function() {

			console.log('deleting...');

			$('#delete-lightbox').show();
		});

		$('#delete-cancel-button').click(function() {
			$('#delete-lightbox').hide();
		});

		$('#delete-submit-button').click(function() {

			var uri = $('#uri').val();

			var deletePost = $.post('{{pages.apiDeleteByURI.uri}}', {
				'uri' : uri, 
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
