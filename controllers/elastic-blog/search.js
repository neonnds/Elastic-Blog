var $ = exports;

var common = require('../../elastic-blog/common.js');

// GET Search Page
$.search = function(query) {

	var self = this;

	common.model = {};
	common.model.query = query;

	var page = common.make(self, common.pages.search);

	self.html(page);
};
