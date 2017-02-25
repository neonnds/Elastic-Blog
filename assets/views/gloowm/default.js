$(document).ready(function() {

	function closeWindow(targetWindow) {

		$(targetWindow).find('.message-list').children().not('.default-item').remove();

		$(targetWindow).find('.modal-body').find('input').val('');

		$(targetWindow).hide();
	}

	$(document).keyup(function(e) {

		e.preventDefault();

		var targetWindow = $('.modal:visible');

                if(targetWindow.length == 0) {
                        return;
                }

		if(e.keyCode == 27) { /* Escape key */

			/* Should only ever get one modal open at a time */
			closeWindow(targetWindow);

		} else if(e.keyCode == 13) { /* Return key */

			/* Should only ever get one modal open at a time */
			var button = $(targetWindow).find(".-success:visible");

			if(button.length == 1) {

				$(button).click();
			}
		}
	});

	$('.close-window').click(function(e) {

		closeWindow($(this).parent().parent().parent());

		e.preventDefault();
	});

	$('.open-window').click(function(e) {

		/* Close the menu */
		$("body").removeClass("nav--open");

		var targetWindow = $($(this).attr('href'));

		$(targetWindow).find('.message-list').children().not('.default-item').remove();

		$(targetWindow).find('input').val('');

		$(targetWindow).show();

		$(targetWindow).attr('tabindex',-1).focus();

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

	$("#nav-button").click(function(e) {

		e.preventDefault();

		$("body").toggleClass("nav--open");
	});
});
