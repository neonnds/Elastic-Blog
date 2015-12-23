var common = require('../../elastic-blog/common.js');
var pages = require('../../elastic-blog/pages.js');

var db = require('../../elastic-blog/database.js');

exports.install = function() {
	F.route(pages.home.uri, getHomePage, pages.home.options);
	F.route(pages.homeByYear.uri, getHomeByYear, pages.homeByYear.options);
};

// GET Home Page
function getHomePage()
{
	var self = this;

	common.model = {};
	common.model.pages = pages;
	common.model.page = pages.home;

	var page = common.make(self, pages.home.views);

	self.html(page);
}

function getHomeByYear(year)
{
	var self = this;

	common.model = {};

	common.model.year = year;
	common.model.pages = pages;
	common.model.page = pages.homeByYear;

	var body = {};

	var page = common.make(self, pages.homeByYear.views);

	self.html(page);
}
