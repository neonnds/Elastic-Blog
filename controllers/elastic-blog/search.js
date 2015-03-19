var common = require('../../elastic-blog/common.js');
var pages = require('../../elastic-blog/pages.js');

exports.install = function(framework) {
	framework.route(pages.search.uri, getSearchPage, ['get']);
};

// GET Search Page
function getSearchPage(query)
{
	var self = this;

	common.model = {};

	common.model.query = query;
	common.model.pages = pages;
	common.model.page = pages.search;
	common.model.body = common.make(self, pages.home.view);

	var page = common.make(self, pages.default.view);

	self.html(page);
}
