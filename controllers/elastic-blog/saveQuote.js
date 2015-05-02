var common = require('../../elastic-blog/common.js');
var pages = require('../../elastic-blog/pages.js');

exports.install = function(framework) {
	framework.route(pages.newQuote.uri, newQuote, pages.newQuote.options);
	framework.route(pages.updateQuote.uri, updateQuote, pages.updateQuote.options);
};

function newQuote()
{
	var self = this;

	common.model = {};
	common.model.pages = pages;
	common.model.page = pages.newQuote;

	var page = common.make(self, pages.newQuote.views);

	self.html(page);
}

function updateQuote(uri)
{
	var self = this;

	common.model = {};
	
	common.EBGetByURI(self, uri, 'quotes', 'quote', function(results) {

		if(results.success == false) {
			
			self.view500("Failed to get quote.");
			
		} else {

			common.model.pages = pages;
			common.model.page = pages.updateQuote;
			common.model.quote = results.message;

			var page = common.make(self, pages.updateQuote.views);

			self.html(page);
		}
	});
}
