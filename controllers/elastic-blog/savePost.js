var common = require('../../elastic-blog/common.js');
var pages = require('../../elastic-blog/pages.js');

exports.install = function(framework) {
	framework.route(pages.newPost.uri, newPost, ['authorize', 'get']);
	framework.route(pages.updatePost.uri, updatePost, ['authorize', 'get']);
};

function newPost()
{
	var self = this;

	common.model = {};

	common.model.pages = pages;
	common.model.page = pages.newPost;
	common.model.body = common.make(self, pages.newPost.view);

	var page = common.make(self, pages.default.view);

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

			console.log(results);

			common.model.pages = pages;
			common.model.page = pages.updatePost;
			common.model.post = results.message;
			common.model.body = common.make(self, pages.updatePost.view);

			var page = common.make(self, pages.default.view);

			self.html(page);
		}
	});
}
