var $ = exports;

var common = require('../../elastic-blog/common.js');
var rho = require("rho");

// GET Post Item
$.viewPost = function(uri) {

	var self = this;

	common.model = {};

	common.EBGetById(uri, 'posts', 'post', function(results) {

		if(results.success == false) {
			
			self.view500("Failed to get post.");
			
			return
		}
			
		if(self.user == null && results.message.live == 'false') {
		
			self.view401("You do not have access to view this post.");		

			return;
		}

		common.model.uri = results.message.uri;

		rho.render(results.message.content, function(err, html) {

			common.model.content = html;

			var page = common.make(self, common.pages.viewPost);

			self.html(page);
		});
	});
};
