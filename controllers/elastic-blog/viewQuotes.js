var common = require('../../elastic-blog/common.js');
var pages = require('../../elastic-blog/pages.js');

exports.install = function(framework) {
	framework.route(pages.viewQuotes.uri, getViewQuotes);
};

function getViewQuotes()
{
	var self = this;

	common.model = {};
	
	common.model.pages = pages;
	common.model.page = pages.viewQuotes;
	common.model.body = common.make(self, pages.home.view);

	var page = common.make(self, pages.default.view);

	self.html(page);
}
