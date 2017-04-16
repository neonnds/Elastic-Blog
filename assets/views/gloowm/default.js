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

		/* Check if key events have been disabled on a dialog */
		if($(targetWindow).hasClass('no-key')) {	
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
		$(targetWindow).find('textarea').val('');

		$(targetWindow).find('.modal-body').children().show();

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

		$('#login-window').addClass('no-key');
		$('#login-window .modal-body').children().hide();

		arrayIntoUL($("#login-message"), ["Checking..."]);

		var loginPost = $.post('{{pages.apiLogin.uri}}', {
			'email' : email, 
			'password' : password
		});

		loginPost.success(function(result) {

			$('#login-window').removeClass('no-key');

			if(result == null) {

				$('#login-window .modal-body').children().show();
		
				arrayIntoUL($("#login-message"), ["An error occured!"]);

			} else {

				if(result.success == true) {

					arrayIntoUL($("#login-message"), ["Login success. Redirecting..."]);

					window.location.replace("{{pages.home.uri}}");	

				} else {

					$('#login-window .modal-body').children().show();

					arrayIntoUL($("#login-message"), result.message);
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

			$('#register-window').addClass('no-key');
			$('#register-window .modal-body').children().hide();

			arrayIntoUL($("#register-message"), ["Loading..."]);

			var registerPost = $.post('{{pages.apiRegister.uri}}', {'email' : email, 'password' : password, 'confirm' : confirm});

			registerPost.success(function(result) {

				$('#register-window').removeClass('no-key');

				if(result.success == true) {

					arrayIntoUL($("#register-message"), result.message);

					$('#register-window').hide();
					$('#login-window').show();

				} else {
				
					$("#register-window .modal-body").children().show();

					arrayIntoUL($("#register-message"), result.message);
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

			var tagItem = $('#default-tag-item').clone();

			$(tagItem).removeAttr('id');

			$(tagItem).children('a').html("NO TAGS");

			$(tagItem).children('a').attr("href", '{{pages.home.uri}}');

			$('#tags').append(tagItem);

			return;
		});

	{{/compare}}
	
	$('#error-ok-button').click(function() {
		$('#error-lightbox').hide();
	});

	$("#nav-button").click(function(e) {

		e.preventDefault();

		$("body").toggleClass("nav--open");
	});

	$('#contact-submit').click(function() {
		
		var message = $('#contact-text').val();
		var email = $('#contact-email').val();
	
		$('#contact-window').find('.modal-body').children().hide();
		$('#contact-window').addClass('no-key');

		arrayIntoUL($("#contact-message"), ["Sending verification pin..."]);

		$("#contact-window").show();


		var saveContact = $.post('{{pages.apiSaveContact.uri}}', {
			'message'  : message, 
			'email'    : email,
		});

		saveContact.success(function(result) {

			if(result.success == false) {

				$('#contact-window').find('.modal-body').children().show();

				arrayIntoUL($("#contact-message"), result.message);

			} else {

				$('#contact-window').removeClass('no-key');
				$("#contact-verify-pin").val('');
				$('#contact-text').val('');
				$('#contact-email').val('');

				arrayIntoUL($("#contact-verify-message"), ["Check your email and enter the pin!"]);

				$('#contact-window').hide();
				$('#contact-verify-window').show();
			}
		});

		saveContact.error(errorHandler);
	});

	$('#contact-verify-submit').click(function() {

		var pin = $('#contact-verify-pin').val();

		$('#contact-verify-window').addClass('no-key');
			
		var verifyContact = $.post('{{pages.apiVerifyContact.uri}}', {
			'pin' : pin
		});

		verifyContact.success(function(result) {

			$('#contact-verify-window').removeClass('no-key');
			$('#contact-verify-window').hide();
		});

		verifyContact.error(errorHandler);
	});
});
