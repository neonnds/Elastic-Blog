var $ = exports;

var common = require('../../elastic-blog/common.js');

$.newPost = function() {

	var self = this;

	common.model = {};

	var page = common.make(self, common.pages.newPost);

	self.html(page);
};

$.updatePost = function(uri) {

	var self = this;

	common.model = {};
	
	common.EBGetByURI(self, uri, 'posts', 'post', function(results) {

		if(results.success == false) {
			
			self.view500("Failed to get post.");
			
		} else {

			common.model.post = results.message;

			var page = common.make(self, common.pages.updatePost);

			self.html(page);
		}
	});
};
