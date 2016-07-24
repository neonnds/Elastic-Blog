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

		window.location.replace("{{pages.search.base}}/" + query);

		return;
	});

	$('#login-submit-button').click(function() {

		var email = $('#login-email').val();
		var password = $('#login-password').val();
	
		$("#login-password").val('');

		var loginPost = $.post('{{pages.apiLogin.uri}}', {'email' : email, 'password' : password});

		loginPost.success(function(result) {

			if(result == null) {

				arrayIntoUL($("#login-message"), ["An error occured!"]);


			} else {

				arrayIntoUL($("#login-message"), result.message);

				if(result.success == true) {

					window.location.replace("{{pages.home.uri}}");	
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

	$('#error-ok-button').click(function() {
		$('#error-lightbox').hide();
	});
});
