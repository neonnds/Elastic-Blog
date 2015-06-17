var common = require('../../elastic-blog/common.js');
var pages = require('../../elastic-blog/pages.js');

exports.install = function(framework) {
	framework.route(pages.search.uri, getSearchPage, pages.search.options);
};

// GET Search Page
function getSearchPage(query)
{
	var self = this;

	common.model = {};
	common.model.query = query;
	common.model.pages = pages;
	common.model.page = pages.search;

	var page = common.make(self, pages.search.views);

	self.html(page);
}
