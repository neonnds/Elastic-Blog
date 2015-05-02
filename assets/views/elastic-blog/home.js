$(document).ready(function() {

	function generateGrid(data) {

		data.forEach(function(dataItem) {

			var portfolioItem = $('#default-portfolio-item').clone();

			$(portfolioItem).removeAttr('id');

			$(portfolioItem).show();

			{{#is pages.viewQuotes.uri "===" page.uri}}
				$(portfolioItem).attr('data-id', dataItem.key);
				$(portfolioItem).find('#edit-button').attr('href', '{{pages.newQuote.uri}}/' + dataItem.uri);
				$(portfolioItem).append(textile.parse(dataItem.content)).after('#portfolio-header');
			{{else}}
				$(portfolioItem).attr('data-id', dataItem.key);
				$(portfolioItem).find('#edit-button').attr('href', '{{pages.newPost.uri}}/' + dataItem.uri);
				$(portfolioItem).append(textile.parse(dataItem.summary)).after('#portfolio-header');
			{{/is}}

			$('#section .portfolio-item:last').after(portfolioItem)
		});
	};


	function getItems() {

		var lastItem = $('#section .portfolio-item').not('#default-portfolio-item').last(); 

		if(lastItem.length == 0) {

			lastItem = '';

		} else {

			lastItem = $(lastItem).attr('data-id');
		}


		var getPosts;

		{{#is pages.home.uri "===" page.uri}}

			getPosts = $.ajax({
				type: "POST", 
				url: '{{pages.apiGetMany.uri}}', 
				data: { 
					last  : lastItem,
					index : 'posts',
					type  : 'post',
					limit : 5
				}
			});


			//If the quote has already been generated there is no need to fetch and generate again
			if($('#section .portfolio-quote').length == 0) {

				var getQuote = $.ajax({
					type: "POST", 
					url: '{{pages.apiGetMany.uri}}', 
					data: { 
						last   : '',
						index  : 'quotes',
						type   : 'quote',
						limit  : 1
					}
				});

				getQuote.done(function(result) {

					if(result == null) {

						window.location.replace("/error");

					} else {

						if(result.success == true) {

							if(result.message.length > 0) {

								$('#section .portfolio-quote').remove();

								var portfolioItem = $('#default-portfolio-item').clone();

								$(portfolioItem).removeAttr('id');

								$(portfolioItem).addClass('portfolio-quote');

								$(portfolioItem).show();

								var dataItem = result.message.pop();
								
								$(portfolioItem).find('#edit-button').attr('href', '{{pages.newQuote.uri}}/' + dataItem.uri);
								$(portfolioItem).append(textile.parse(dataItem.content));
				
								$('#section .portfolio-item:first').after(portfolioItem)
							} else {

								$('#empty-quote-portfolio-item').show();
							}
						}
					}
				});

				getQuote.fail(errorHandler);
			}

		{{else}}

			{{#is pages.homeByYear.uri "===" page.uri}}

				getPosts = $.ajax({
					type: "POST", 
					url: '{{pages.apiGetManyByDateRange.uri}}', 
					data: { 
						 from  :  '{{year}}/01/01', 
						   to  :  '{{year}}/12/31', 
						 last  :  lastItem,
						index  :  'posts',
						 type  :  'post',
						limit  :  5
					}
				});

			{{else}}

				{{#is pages.search.uri "===" page.uri}}

					getPosts = $.ajax({
						type: "POST", 
						url: '{{pages.apiSearch.uri}}', 
						data: { 
							query  : '{{query}}', 
							last   : lastItem, 
							fields : ['uri', 'summary', 'content'],
							index  : 'posts',
							type   : 'post',
							limit  : 5
						}
					});

				{{else}}

					getPosts = $.ajax({
						type: "POST", 
						url: '{{pages.apiGetMany.uri}}', 
						data: { 
							last   : lastItem, 
							index  : 'quotes',
							type   : 'quote',
							limit  : 5
						}
					});

				{{/is}}

			{{/is}}

		{{/is}}

		getPosts.done(function(result) {

			if(result == null) {

				window.location.replace("{{pages.error.uri}}");

			} else {

				if(result.success == true) {

					if(result.message.length > 0) {
					
						generateGrid(result.message);

					} else {

						$('#more-button').hide();

						var itemCount = $('#section .portfolio-item').not('#default-portfolio-item').not('#empty-quote-portfolio-item').not('#empty-post-portfolio-item').length;	

						if(itemCount == 0) {
							$('#empty-post-portfolio-item').show();		
						}
					}
				}
			}
		});

		getPosts.fail(errorHandler);
	}

	$('#more-button').click(function() {

		getItems();
	});

	getItems();
});
