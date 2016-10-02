var $ = exports;

var common = require('../../elastic-blog/common.js');
var rho = require("rho");


// GET Post Item
$.viewPost = function(uri) {

	var self = this;

	common.model = {};

	common.ECGet({"_type" : 'post', "_uri" : uri}, 1, [], [], [], function(result) {

		if(result.success == false) {
			
			self.view404("Failed to get post with given URI!");
			
			return
		}

		var post = result.message[0];

		/*
		 * If you own the post then you can view it. 
		 * If you do not own it then it has to be live to view.
		 */
		if((self.user == null || self.user._id != post._user) && post.live == 'false') {
		
			self.view401("You do not have access to view this post.");		

			return;
		}

		common.model.uri = post._uri;

		rho.render(post._content, function(err, html) {

			common.model.content = html;

			var page = common.make(self, common.pages.viewPost);

			self.html(page);
		});
	});
};
