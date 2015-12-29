var $ = exports;

var common = require('../../elastic-blog/common.js');

// GET Home Page
$.home = function() {

	var self = this;

	common.model = {};

	var page = common.make(self, common.pages.home);

	self.html(page);
};

$.homeByYear = function(year) {

	var self = this;

	common.model = {};

	common.model.year = year;

	var body = {};

	var page = common.make(self, common.pages.homeByYear);

	self.html(page);
};
