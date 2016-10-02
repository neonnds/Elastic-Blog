$(document).ready(function() {

	function generateGrid(data) {

		data.forEach(function(dataItem) {

			var portfolioItem = $('#default-portfolio-item').clone();

			$(portfolioItem).html("");
			$(portfolioItem).removeAttr('id');

			$(portfolioItem).show();

			$(portfolioItem).attr('data-id', dataItem["_key"]);
			$(portfolioItem).append(rho.toHtml(dataItem["_content"])).after('#portfolio-header');

			$('#section .portfolio-item:last').after(portfolioItem)
		});
	};

	function getItems() {

		var lastItem = $('#section .portfolio-item').not('#default-portfolio-item').not('#empty-post-portfolio-item').not('#empty-quote-portfolio-item').last(); 

		if(lastItem.length == 0) {
			lastItem = [];
		} else {
			lastItem = ["_key", "<", $(lastItem).attr('data-id')];
		}

		var getPosts;

		{{#compare pages.home.uri "===" page.uri}}

			getPosts = $.ajax({
				type: "POST", 
				url: '{{pages.apiGetMany.uri}}', 
				data: { 
					range    : [],
					last     : lastItem,
					category : 'summary',
					limit    : 8,
					order    : ["_key", "DESC"]
				}
			});

			//If the quote has already been generated there is no need to fetch and generate again
			if($('#section .portfolio-quote').length == 0) {

				var getQuote = $.ajax({
					type: "POST", 
					url: '{{pages.apiGetMany.uri}}', 
					data: { 
						range    : [],
						last     : [],
						category : 'quote',
						limit    : 1,
						order    : ["_key", "DESC"]
					}
				});

				getQuote.done(function(result) {

					$('#section .portfolio-quote').remove();

					for(var i = 0, len = result.message.length; i < len; i++) {

						var portfolioItem = $('#default-portfolio-item').clone();

						$(portfolioItem).html("");
						$(portfolioItem).removeAttr('id');

						$(portfolioItem).addClass('portfolio-quote');

						$(portfolioItem).show();

						var dataItem = result.message.pop();

						$(portfolioItem).append(rho.toHtml(dataItem["_content"]));
		
						$('#section .portfolio-item:first').after(portfolioItem)
					}
				});

				getQuote.fail(function(jqXHR, status, error) {

					$('#empty-quote-portfolio-item').show();
				});
			}

		{{else}}

			{{#compare pages.homeByYear.uri "===" page.uri}}

				getPosts = $.ajax({
					type: "POST", 
					url: '{{pages.apiGetMany.uri}}', 
					data: { 
						range    :  ["_created", '{{year}}-01', '{{year}}-12'] 
						last     :  lastItem,
						category :  'summary',
						limit    :  8,
						order    :  ["_key", "DESC"]
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
							limit  : 5,
							sort   : "desc"
						}
					});

				{{/compare}}

			{{/compare}}

		{{/compare}}

		getPosts.done(function(result) {
	
			generateGrid(result.message);
		});

		getPosts.fail(function(jqXHR, status, error) {

			$('#more-button').hide();

			var itemCount = $('#section .portfolio-item').not('#default-portfolio-item').not('#empty-quote-portfolio-item').not('#empty-post-portfolio-item').length;	

			if(itemCount == 0) {
				$('#empty-post-portfolio-item').show();		
			}
		});
	}

	$('#more-button').click(function() {
		getItems();
	});

	getItems();
});
