$(document).ready(function() {

	function generateGrid(data) {

		data.forEach(function(dataItem) {

			var portfolioItem = $('#default-portfolio-item').clone();

			$(portfolioItem).html("");
			$(portfolioItem).removeAttr('id');

			$(portfolioItem).show();

			$(portfolioItem).attr('data-id', dataItem.key);
			$(portfolioItem).append(rho.toHtml(dataItem.content)).after('#portfolio-header');

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

		{{#compare pages.home.uri "===" page.uri}}

			getPosts = $.ajax({
				type: "POST", 
				url: '{{pages.apiGetMany.uri}}', 
				data: { 
					from  : "",
					to    : "",
					last  : lastItem,
					group : 'summary',
					limit : 8,
					sort  : "key:desc"
				}
			});

			//If the quote has already been generated there is no need to fetch and generate again
			if($('#section .portfolio-quote').length == 0) {

				var getQuote = $.ajax({
					type: "POST", 
					url: '{{pages.apiGetMany.uri}}', 
					data: { 
						from   : '',
						to     : '',
						last   : '',
						group  : 'quote',
						limit  : 2,
						sort   : "key:desc"
					}
				});

				getQuote.done(function(result) {

					if(result == null) {

						window.location.replace("/error");

					} else {

						if(result.success == true) {

							if(result.message.length > 0) {

								$('#section .portfolio-quote').remove();

								for(var i = 0, len = result.message.length; i < len; i++) {

									var portfolioItem = $('#default-portfolio-item').clone();

									$(portfolioItem).html("");
									$(portfolioItem).removeAttr('id');

									$(portfolioItem).addClass('portfolio-quote');

									$(portfolioItem).show();

									var dataItem = result.message.pop();

									$(portfolioItem).append(rho.toHtml(dataItem.content));
					
									$('#section .portfolio-item:first').after(portfolioItem)
								}

							} else {

								$('#empty-quote-portfolio-item').show();
							}
						}
					}
				});

				getQuote.fail(errorHandler);
			}

		{{else}}

			{{#compare pages.homeByYear.uri "===" page.uri}}

				getPosts = $.ajax({
					type: "POST", 
					url: '{{pages.apiGetMany.uri}}', 
					data: { 
						 from  :  '{{year}}/01/01', 
						   to  :  '{{year}}/12/31', 
						 last  :  lastItem,
						group  :  'summary',
						limit  :  8,
						 sort  :  "key:desc"
					}
				});

			{{else}}

				{{#compare pages.search.uri "===" page.uri}}

					getPosts = $.ajax({
						type: "POST", 
						url: '{{pages.apiSearch.uri}}', 
						data: { 
							query  : '{{query}}', 
							last   : lastItem, 
							fields : ['content'],
							limit  : 5,
							sort   : "key:desc"
						}
					});

				{{/compare}}
			{{/compare}}

		{{/compare}}

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
