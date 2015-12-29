			
$(document).ready(function() {
	
	$('#search-button').click(function() {

		if($('#search-field').is(":visible") == true) {
			var query = $('#search-field').val();

			window.location.replace("{{pages.search.base}}/" + query);

			return;
		}

		$('#search-field').show();
		$('#cancel-search-button').css('display', 'inline-block');

		$('#home-menu-item').hide();
		$('#posts-menu-item').hide();
		
		{{#if user}}

			$('#admin-menu-item').hide();
			$('#logout-menu-item').hide();

		{{else}}

			$('#login-menu-item').hide();

			{{#compare pages.apiRegister.active "==" true}}
				$('#register-menu-item').hide();
			{{/compare}}

		{{/if}}
	});

	$('#cancel-search-button').click(function() {

		$('#home-menu-item').show();
		$('#posts-menu-item').show();
		$('#search-field').hide();
		$('#cancel-search-button').hide();
		
		{{#if user}}

			$('#admin-menu-item').show();
			$('#logout-menu-item').show();

		{{else}}

			$('#login-menu-item').show();

			{{#compare pages.apiRegister.active "==" true}}
				$('#register-menu-item').show();
			{{/compare}}

		{{/if}}
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

						//window.location.replace("{{pages.home.uri}}");	
						$('#register-lightbox').hide();
						$('#login-lightbox').show();
					}
				}
			});

			registerPost.error(errorHandler);
		});

		$('#menu-register-button').click(function() {
			$('#register-lightbox').show();	
		});

		$('#register-cancel-button').click(function() {
			$('#register-lightbox').hide();
		});

	{{/compare}}

	$('#menu-login-button').click(function() {
		$('#login-lightbox').show();	
	});

	$('#login-cancel-button').click(function() {
		$('#login-lightbox').hide();
	});

	$('#error-ok-button').click(function() {
		$('#error-lightbox').hide();
	});
});
