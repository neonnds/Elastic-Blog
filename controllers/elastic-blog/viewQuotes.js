var common = require('../../elastic-blog/common.js');
var pages = require('../../elastic-blog/pages.js');

exports.install = function(framework) {
	framework.route(pages.viewQuotes.uri, getViewQuotes, pages.viewQuotes.options);
};

function getViewQuotes()
{
	var self = this;

	common.model = {};
	
	common.model.pages = pages;
	common.model.page = pages.viewQuotes;

	var page = common.make(self, pages.viewQuotes.views);

	self.html(page);
}
