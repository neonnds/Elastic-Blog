var $ = exports;

var common = require('../../elastic-blog/common.js');


$.newPost = function() {

	var self = this;

	common.model = {};

	var page = common.make(self, common.pages.newPost);

	self.html(page);
};
