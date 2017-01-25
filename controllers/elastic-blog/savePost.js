var $ = exports;

var common = require('../../elastic-blog/common.js');


$.newPost = function() {

	var self = this;

	common.model = {};

	var page = common.make(self, common.pages.newPost);

	self.html(page);
};

$.exportPost = function(uri) {

	var self = this;

	common.ECGet([`_type = "post"`, `_uri = "${uri}"`], 1, [], [], [], function(result) {

		if(result.success == false) {
			
			self.view404("Could not get post with given URI!");
			
		} else {

			var post = result.message[0];

			/*
			 * If you own the post then you can view it. 
			 * If you do not own it then it has to be live to view. 
			 */
			if((self.user == null || self.user._id != post._user) && post.live == 'false') {
			
				self.view401("You do not have access to view this post.");		

				return;
			}

			//Set the download name to the orignal filename rather then the file key
			var headers = [];
			headers["Pragma"] = "public";
			headers["Expires"] = "0";
			headers['Access-Control-Allow-Origin'] = "*";
			headers["Cache-Control"] = "must-revalidate, post-check=0, pre-check=0";
			headers["Content-Type"] = "application/force-download";
			headers["Content-Type"] = "application/octet-stream";
			headers["Content-Type"] = "application/download";
			headers["Content-Disposition"] = `attachment;filename=${uri}.json`;
			headers["Content-Transfer-Encoding"] = "binary";

			self.plain(JSON.stringify(post), headers);
		}
	});
};
