$(document).ready(function() {

	/* Make sure all fields are reset on page load */
	$("#uri").val("");
	$("#content").val("");	
	$("#preview").html("");

	function getItems() {

		$('#default-load-select').hide();

		$('#load-select').remove();

		/* We don't want people pressing load until results are returned */
		$('#load-submit-button').hide();
		$('#export-submit-button').hide();

		$('.new-tag-text').html('Add new tag...');

		var loadSelect = $('#default-load-select').clone();

		$(loadSelect).attr("id", 'load-select');

		$(loadSelect).children().remove();

		$('#default-load-select').after(loadSelect);

		$(loadSelect).show();

		var category = $('#load-category').val();

		var getItems = $.ajax({
			type: "POST",
			url: '{{pages.apiGetMyPosts.uri}}',
			data: {
				range    : [],
				last     : [],
				category : category,
				limit    : 1000,
				order    : ["_updated", "DESC"]
			}
		});

		getItems.done(function(result) {

			var message = result.message;

			for(var i = 0; i < message.length; i++) {

				var item = $('#default-load-select-item').clone();	

				$(item).attr('value', message[i]["_uri"]);
				$(item).removeAttr('id');
				$(item).text(message[i]["_uri"]);

				$('#load-select').append(item);
			}
		});

		getItems.fail(function(jqXHR, status, error) {

			$('#load-select').remove();
			$('#default-load-select').show();
			$('#export-submit-button').hide();
			$('#load-submit-button').hide();

			return;
		});

		$('#load-window').show();
	}

	$('#menu-load-button').click(function() {

		getItems();

		$('#load-submit-button').show();

		$("#load-category").change(function() {

			getItems();

			$('#load-submit-button').show();
		});

		$('#load-submit-button').click(function() {

			var uri = $('#load-select').val();

			$('#uri').val("");
			$('#content').val("");
			$('#tags li').not('#new-tag').not('#default-tag-item').remove();

			var getPost = $.ajax({
				type: "POST",
				url: '{{pages.apiGetPost.uri}}',
				data: {
					uri : uri
				}
			});

			getPost.done(function(result) {

				var message = result.message.pop();

				$('#uri').val(message._uri);
				$('#content').val(message._content);

				for(var i = 0; i < message._tags.length; i++) {

					var tagItem = $('#default-tag-item').clone();

					$(tagItem).removeAttr('id');

					$(tagItem).children('.tag-text').html(message._tags[i]);

					$('#new-tag').after(tagItem);
				}
		
				$('#load-window').hide();

				$("#uri").trigger("input");
			});

			getPost.fail(errorHandler);

			$(this).off('click');
			$("#load-category").off('change');
		});
	});

	$('#menu-export-button').click(function() {

		getItems();

		$('#export-submit-button').show();

		$("#load-category").change(function() {

			getItems();

			$('#export-submit-button').show();
		});

		$('#export-submit-button').click(function() {

			var uri = $('#load-select').val();

			window.open(`{{pages.exportPost.base}}/${uri}`, '_blank');

			$('#load-window').hide();
			$(this).off('click');
			$("#load-category").off('change');
		});
	});

	$('#menu-import-button').click(function() {

		var sendObj = null;

		$('#upload-list').html("");
		$('#upload-list').hide();
		$('#import-submit-button').hide();

		$('#import-submit-button').click(function() {

			if(sendObj == null) {
				return;
			}

			var ajaxData = new FormData();
			
			ajaxData.append('upload', sendObj);

			$.ajax({
				xhr: function () {
					var xhr = $.ajaxSettings.xhr();
					xhr.upload.onprogress = function (e) {
						console.log(Math.floor(e.loaded / e.total * 100) + '%');
					};
					return xhr;
				},
				contentType: false,
				processData: false,
				type: 'POST',
				data: ajaxData,
				url: '{{pages.apiImportPost.uri}}',
				success: function(response) {
					console.log("success");
				},
				error: function() {
					console.log("Error");
				},
				complete: function() {
					console.log("Complete");
				}
			});

			$('#import-window').hide();

			$(this).off();

			$(".upload-browse").off();
			$("#upload").off();
			$("#upload-drop").off();
		});

		$('.upload-browse').click(function() {

			$("#upload").click();
			
			$('#upload').change(function(e){

				sendObj = e.target.files[0];
	
				$('#upload-list').html(sendObj.name);
				$('#upload-list').show();
				$('#import-submit-button').show();
			});
		});

		$("#upload-drop").on("dragover", function(event) {

			event.preventDefault();  
			event.stopPropagation();

			$(this).addClass('upload-area-active');
		});

		$("#upload-drop").on('dragleave dragend drop', function() {

			$(this).removeClass('upload-area-active');
		});

		$("#upload-drop").on("drop", function(event) {

			sendObj = event.originalEvent.dataTransfer.files[0];

			$('#upload-list').html(sendObj.name);
			$('#upload-list').show();
			$('#import-submit-button').show();

			event.preventDefault();  
			event.stopPropagation();
		});
	});

	$('#menu-save-button').click(function() {

		var category = $('#category').val();
		var uri = $('#uri').val();
		var content = $('#content').val();
		var live = $('#live').val();
		var tags = ["", ""]; //We place a empty element due to https://github.com/nodejs/node/issues/11145	

		$('#tags li').not('#new-tag').not('#default-tag-item').each(function(index) {
			tags.push($(this).find('.tag-text').text().trim());
		});

		var savePost = $.post('{{pages.apiSavePost.uri}}', {
			'uri'      : uri, 
			'content'  : content, 
			'tags'     : tags
		});

		savePost.success(function(result) {

			arrayIntoUL($("#save-message"), ["Your post has been saved!"]);
		});

		savePost.error(errorHandler);
	});

	$('#menu-preview-button').click(function() {

		var uri = $('#uri').val();

		var getPost = $.ajax({
			type: "POST",
			url: '{{pages.apiGetPost.uri}}',
			data: {
				uri : uri
			}
		});

		getPost.done(function(result) {

			window.open(`{{pages.viewPost.base}}/${uri}`, '_blank');

			$('#preview-window').hide();
		});

		getPost.fail(function(jqXHR, status, error) {

			arrayIntoUL($("#preview-message"), ["You need to save the post first!"]);
		});
	});

	$('#menu-delete-button').click(function() {

		var uri = $('#uri').val();

		$('#delete-window .modal-body').children().hide();

		var getPost = $.ajax({
			type: "POST",
			url: '{{pages.apiGetPost.uri}}',
			data: {
				uri : uri
			}
		});

		getPost.done(function(result) {

			$('#delete-submit-button').show();
			$('#delete-cancel-button').show();

			arrayIntoUL($("#delete-message"), ["Really delete this post?"]);

			$('#delete-submit-button').click(function() {

				var uri = $('#uri').val();

				$('#delete-window .modal-body').children().hide();
				$('#delete-close-button').show();

				var deletePost = $.post('{{pages.apiDeletePost.uri}}', {
					'uri' : uri
				});

				deletePost.success(function(result) {

					$('#uri').val('');
					$('#content').val('');

					updateFire();

					arrayIntoUL($("#delete-message"), ["Your post has been deleted!"]);
				});

				deletePost.error(errorHandler);
			});
		});

		getPost.fail(function(jqXHR, status, error) {

			$('#delete-close-button').show();

			arrayIntoUL($("#delete-message"), ["You need to save the post first!"]);
		});
	});

	$('.new-tag-text').click(function() {

		$(this).html("&nbsp;");
	});

	$('.new-tag-button').click(function() {

		var found = false;

		var tag = $('.new-tag-text').text();

		if(tag == "Cannot have empty tags..." || tag == "Add new tag..." || tag == "Tag already exists...") {

			return;	
		}

		if(tag.trim().length == 0) {

			$('.new-tag-text').html('Cannot have empty tags...');
		
			return;
		}

		$('#tags li').not('#new-tag').not('#default-tag-item').each(function(index) {

			var existingTag = $(this).find('.tag-text').text();

			if(tag == existingTag) {
				found = true;
			}
		});

		if(found == true) {
		
			$('.new-tag-text').html('Tag already exists...');

			return;
		}

		$('.new-tag-text').html('Add new tag...');

		var tagItem = $('#default-tag-item').clone();

		$(tagItem).removeAttr('id');

		$(tagItem).children('.tag-text').html(tag);

		$('#new-tag').after(tagItem);
	});

	$('#tags').on('click', '.remove-tag-button', function() {

		var selected = this;
		
		$(selected).parent().remove();
	});
	
	function updateEditorSize() {

		var windowHeight = $(window).height() - 420;

		$("#content").height(windowHeight);
		$('#preview').height(windowHeight);
	}

	/* Based on the state of the URI and CONTENT fields update page */
	function updateFire() {

		var uri = $('#uri').val();
		var content = $('#content').val();

		if(uri == "" && content == "") {
	
			$('#menu-delete-button').hide();
			$('#menu-preview-button').hide();
			$('#menu-save-button').hide();

		} else {

			$('#menu-delete-button').show();
			$('#menu-preview-button').show();
			$('#menu-save-button').show();
		}

		updateEditorSize();

		var contentText = $('#content').val();

		if(contentText && contentText == last) {
			return; 
		}

		last = contentText;

		var previewHTML = rho.toHtml(contentText);
		
		$('#preview').html(previewHTML);
	}

	$(window).resize(function() {
		updateEditorSize();
	});

	$('#content').on('input', function() {
		updateFire();
	}).focus();

	$('#uri').on('input', function() {
		updateFire();
	});

	$("#content").trigger("input");
	$("#uri").trigger("input");
});
