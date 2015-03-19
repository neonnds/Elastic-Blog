var common = require('../../elastic-blog/common.js');
var pages = require('../../elastic-blog/pages.js');

exports.install = function(framework) {
	framework.route(pages.newQuote.uri, newQuote, ['authorize', 'get']);
	framework.route(pages.updateQuote.uri, updateQuote, ['authorize', 'get']);
};

function newQuote()
{
	var self = this;

	common.model = {};

	common.model.pages = pages;
	common.model.page = pages.newQuote;
	common.model.body = common.make(self, pages.saveQuote.view);

	var page = common.make(self, pages.default.view);

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

			common.mode.pages = pages;
			common.model.page = common.pages.updateQuote;
			common.model.quote = results.message;
			common.model.body = common.make(self, pages.saveQuote.view);

			var page = common.make(self, pages.default.view);

			self.html(page);
		}
	});
}
