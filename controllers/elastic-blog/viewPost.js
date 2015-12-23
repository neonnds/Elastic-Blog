var common = require('../../elastic-blog/common.js');
var pages = require('../../elastic-blog/pages.js');
var textile = require('textile-js');
var rho = require("rho");

exports.install = function() {
	F.route(pages.viewPost.uri, getViewPost, pages.viewPost.options);
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
			common.model.uri = results.message.uri;

			rho.render(results.message.content, function(err, html) {

				common.model.content = html;

				var page = common.make(self, pages.viewPost.views);

				self.html(page);
			});
		}
	});
}
