var common = require('../../elastic-blog/common.js');
var pages = require('../../elastic-blog/pages.js');

exports.install = function(framework) {
	framework.route(pages.home.uri, getHomePage);
	framework.route(pages.homeByYear.uri, getHomeByYear);
};

// GET Home Page
function getHomePage()
{
	var self = this;

	common.model = {};

	common.model.pages = pages;
	common.model.page = pages.home;
	common.model.body = common.make(self, pages.home.view);

	var page = common.make(self, pages.default.view);

	self.html(page);
}

function getHomeByYear(year)
{
	var self = this;

	common.model = {};

	common.model.year = year;
	common.model.pages = pages;
	common.model.page = pages.homeByYear;
	common.model.body = common.make(self, pages.home.view);

	var page = common.make(self, pages.default.view);

	self.html(page);
}
