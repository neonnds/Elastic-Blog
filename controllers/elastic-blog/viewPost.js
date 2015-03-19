var common = require('../../elastic-blog/common.js');
var pages = require('../../elastic-blog/pages.js');
var textile = require('textile-js');

exports.install = function(framework) {
	framework.route(pages.viewPost.uri, getViewPost);
};

// GET Post Item
function getViewPost(uri)
{
	var self = this;

	common.model = {};

	common.EBGetByURI(self, uri, 'posts', 'post', function(results) {

		if(results.success == false) {
			
			self.view500("Failed to get post.");
			
		} else {

			common.model.pages = pages;
			common.model.page = pages.view;
			common.model.content = textile.parse(results.message.content);
			common.model.uri = results.message.uri;
			common.model.body = common.make(self, pages.viewPost.view);

			var page = common.make(self, pages.default.view);

			self.html(page);
		}
	});
}
