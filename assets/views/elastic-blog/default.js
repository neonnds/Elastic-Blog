$(document).ready(function() {
	
	$('.close-window').click(function(e) {
		$(this).parent().parent().parent().hide();
		e.preventDefault();
	});

	$('.open-window').click(function(e) {
		$($(this).attr('href')).show();
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
	
		var loginPost = $.post('{{pages.apiLogin.uri}}', {'email' : email, 'password' : password});

		loginPost.success(function(result) {

			if(result == null || result.success == false) {


			} else {

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
		
			var registerPost = $.post('{{pages.apiRegister.uri}}', {'email' : email, 'password' : password, 'confirm' : confirm});

			registerPost.success(function(result) {

				if(result == null || result.success == false) {

				} else {

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
