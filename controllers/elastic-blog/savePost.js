var common = require('../../elastic-blog/common.js');
var pages = require('../../elastic-blog/pages.js');

exports.install = function(framework) {
	framework.route(pages.newPost.uri, newPost, pages.newPost.options);
	framework.route(pages.updatePost.uri, updatePost, pages.updatePost.options);
};

function newPost()
{
	var self = this;

	common.model = {};
	common.model.pages = pages;
	common.model.page = pages.newPost;

	var page = common.make(self, pages.newPost.views);

	self.html(page);
}

function updatePost(uri)
{
	var self = this;

	common.model = {};
	
	common.EBGetByURI(self, uri, 'posts', 'post', function(results) {

		if(results.success == false) {
			
			self.view500("Failed to get post.");
			
		} else {

			common.model.pages = pages;
			common.model.page = pages.updatePost;
			common.model.post = results.message;

			var page = common.make(self, pages.updatePost.views);

			self.html(page);
		}
	});
}
