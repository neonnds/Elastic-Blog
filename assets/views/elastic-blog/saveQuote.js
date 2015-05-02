$(document).ready(function() {

	$('#save-button').click(function() {

		var uri = $('#uri').val();
		var content = $('#content').val();

		var isLive = false;

		if($('#live-button').hasClass('blog-button-active') == true) {
			isLive = true;
		}

		var saveQuote = $.post('{{pages.apiSaveQuote.uri}}', {'uri' : uri, 'content' : content, 'live' : isLive});

		saveQuote.success(function(result) {

			if(result == null || result.success == false) {

				window.location.replace("/error");

			} else {

				if(result.success == true) {

					$('#save-lightbox').show();

					$('#save-close-button').click(function() {
						window.location.replace("{{pages.updateQuote.base}}/" + uri);	
					});
				}
			}
		});

		saveQuote.error(errorHandler);
	});

	$('#live-button').click(function() {

		if($('#live-button').hasClass('blog-button-active') == true) {
	
			$(this).removeClass('blog-button-active');

		} else {

			$(this).addClass('blog-button-active');
		}
	});

	{{#is pages.updateQuote.uri "===" page.uri}}

		$('#delete-button').click(function() {

			$('#delete-lightbox').show();
		});

		$('#delete-cancel-button').click(function() {
			$('#delete-lightbox').hide();
		});

		$('#delete-submit-button').click(function() {

			var uri = $('#uri').val();

			var deleteQuote = $.post('{{pages.apiDeleteByURI.uri}}', {
				'uri' : uri, 
				'index' : 'quotes', 
				'type' : 'quote'
			});

			deleteQuote.success(function(result) {

				if(result == null || result.success == false) {

					window.location.replace("{{pages.home.uri}}");

				} else {

					if(result.success == true) {

						window.location.replace('{{pages.home.uri}}');	
					}
				}
			});

			deleteQuote.error(errorHandler);
		});

	{{/is}}

	function convert_text() {

		var text = $('#content').val();

		if( text && text == last ) {
			return;
		}

		last = text;

		var startTime = new Date() * 1;	

		var html = textile.parse( text );

		var endTime = new Date() * 1;
		processing_time = endTime - startTime;

		$('#preview').html(html);
	}

	function onInput( e ) {
		clearTimeout( convertTextTimer );
		defer_time = Math.min( processing_time, max_delay );
		convertTextTimer = setTimeout( convert_text, defer_time );
	}

	$('#content').bind( 'keyup', onInput ).focus();

	convert_text();
});
