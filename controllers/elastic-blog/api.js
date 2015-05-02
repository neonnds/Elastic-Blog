var common = require('../../elastic-blog/common.js');
var pages = require('../../elastic-blog/pages.js');

exports.install = function(framework) {
	framework.route(pages.apiGetByURI.uri, getByURI, pages.apiGetByURI.options);
	framework.route(pages.apiGetMany.uri, getMany, pages.apiGetMany.options);
	framework.route(pages.apiGetManyByDateRange.uri, getManyByDateRange, pages.apiGetManyByDateRange.options);
	framework.route(pages.apiSavePost.uri, savePost, pages.apiSavePost.options);
	framework.route(pages.apiSaveQuote.uri, saveQuote, pages.apiSaveQuote.options);
	framework.route(pages.apiDeleteByURI.uri, deleteByURI, pages.apiDeleteByURI.options);
};

function savePost()
{
	var self = this;

	var uri = self.post.uri;
	var summary = self.post.summary;
	var content = self.post.content;
	var user = self.user.id;
	var live = self.post.live;

	var data = {'uri' : uri, 'summary' : summary, 'content' : content, 'user' : user, 'live' : live};

	common.EBSave(self, data, 'posts', 'post', function(results) {

		if(results.success == false) {
	
			self.view500(results.message);

		} else {

			self.json(results);
		}
	});
}

function saveQuote()
{
	var self = this;

	var uri = self.post.uri;
	var content = self.post.content;
	var user = self.user.id;
	var live = self.post.live;

	var data = {'uri' : uri, 'content' : content, 'user' : user, 'live' : live};

	common.EBSave(self, data, 'quotes', 'quote', function(results) {

		if(results.success == false) {
	
			self.view500(results.message);

		} else {

			self.json(results);
		}
	});
}

function getByURI()
{
	var self = this;

	var uri = self.post.uri;
       	var index = self.post.index;
        var type = self.post.type;

	common.EBGetByURI(self, uri, index, type, function(results) {

		if(results.success == false) {
			
			self.view500(results.message);
			
		} else {

			self.json(results.message);
		}
	});
}

function getMany()
{
	var self = this;

	var last = self.post.last;
       	var index = self.post.index;
        var type = self.post.type;
	var limit = self.post.limit;
	
	common.EBGetMany(self, last, index, type, limit, function(results) {

		if(results.success == false) {
			
			self.view500(results.message);
			
		} else {

			self.json(results);
		}
	});
}

function getManyByDateRange()
{
	var self = this;

	var from = self.post.from;
	var to = self.post.to;
	var last = self.post.last;
	var index = self.post.index;
	var type = self.post.type;
	var limit = self.post.limit;

	common.EBGetManyByDateRange(self, from, to, last, index, type, limit, function(results) {

		if(results.success == false) {
			
			self.view500(results.message);
			
		} else {

			self.json(results);
		}
	});
}

function deleteByURI()
{
	var self = this;

	var uri = self.post.uri;
	var index = self.post.index;
	var type = self.post.type;

	common.EBDelete(self, uri, index, type, function(results) {

		if(results.success == false) {
	
			self.view500(results.message);

		} else {

			self.json(results);
		}
	});
}
