$(document).ready(function() {
	
	$('.close-window').click(function(e) {

		$('.message-list').children().not('.default-item').remove();

		var targetWindow = $(this).parent();

		$(targetWindow).find('input').val('');

		$(targetWindow).parent().parent().hide();

		e.preventDefault();
	});

	$('.open-window').click(function(e) {

		$('.message-list').children().not('.default-item').remove();

		var targetWindow = $($(this).attr('href'));

		$(targetWindow).find('input').val('');

		$(targetWindow).show();

		e.preventDefault();
	});

	$('#search-submit-button').click(function() {

		var query = $('#search-terms').val();

		window.location.replace(`{{pages.search.base}}/${query}`);

		return;
	});

	$('#login-submit-button').click(function() {

		var email = $('#login-email').val();
		var password = $('#login-password').val();
	
		$("#login-password").val('');

		$('#login-window .modal-body').children().hide();

		arrayIntoUL($("#login-message"), ["Checking..."]);

		var loginPost = $.post('{{pages.apiLogin.uri}}', {
			'email' : email, 
			'password' : password
		});

		loginPost.success(function(result) {

			if(result == null) {

				$('#login-window .modal-body').children().show();
		
				arrayIntoUL($("#login-message"), ["An error occured!"]);

			} else {

				arrayIntoUL($("#login-message"), result.message);

				if(result.success == true) {

					window.location.replace("{{pages.home.uri}}");	

				} else {

					$('#login-window .modal-body').children().show();
				}
			}
		});

		loginPost.error(errorHandler);
	});

	{{#compare pages.apiRegister.active "==" true}}

		$('#register-submit-button').click(function() {

			var email = $('#register-email').val();
			var password = $('#register-password').val();
			var confirm = $('#register-confirm').val();

			$("#register-password").val('');
			$("#register-confirm").val('');

			var registerPost = $.post('{{pages.apiRegister.uri}}', {'email' : email, 'password' : password, 'confirm' : confirm});

			registerPost.success(function(result) {

				if(result == null) {

					arrayIntoUL($("#register-message"), ["An error occured!"]);

				} else {

					arrayIntoUL($("#register-message"), result.message);

					if(result.success == true) {
						$('#register-window').hide();
						$('#login-window').show();
					}
				}
			});

			registerPost.error(errorHandler);
		});

	{{/compare}}

	{{#compare pages.newPost.uri "!==" page.uri}}

		var getTags = $.ajax({
			type: "POST", 
			url: '{{pages.apiGetTags.uri}}', 
			data: {}
		});

		getTags.done(function(result) {

			$('#tags li').not("#default-tag-item").remove();

			for(var i = 0, len = result.message.length; i < len; i++) {

				var tagItem = $('#default-tag-item').clone();

				$(tagItem).removeAttr('id');

				$(tagItem).children('a').html(result.message[i].tag);

				$(tagItem).children('a').attr("href", `{{pages.tags.base}}/${result.message[i].tag}`);

				$('#tags').append(tagItem);
			}
		});

		getTags.fail(function(jqXHR, status, error) {

			console.log(error);
		});

	{{/compare}}
	
	$('#error-ok-button').click(function() {
		$('#error-lightbox').hide();
	});
});
