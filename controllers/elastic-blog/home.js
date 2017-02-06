var $ = exports;

var common = require('../../elastic-blog/common.js');

// GET Home Page
$.home = function() {

	var self = this;

	common.model = {};

	var page = common.make(self, common.pages.home);

	self.html(page);
};

$.homeByDate = function(fromDate, toDate) {

	var self = this;

	common.model = {};

	common.model.fromDate = fromDate;
	common.model.toDate = toDate;

	var body = {};

	var page = common.make(self, common.pages.homeByDate);

	self.html(page);
};
