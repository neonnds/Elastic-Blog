var $ = exports;

var common = require('../../elastic-blog/common.js');

$.apiSavePost = function() {

	var self = this;

	var uri = self.post.uri;
	var content = self.post.content;
	var user = self.user.id;
	var live = self.post.live;
	var group = self.post.group;	

	var data = {'uri' : uri, 'content' : content, 'user' : user, 'live' : live, 'group' : group};

	common.EBSave(self, data, 'posts', 'post', function(results) {

		if(results.success == false) {
	
			self.view500(results.message);

		} else {

			self.json(results);
		}
	});
};

$.apiGetByURI = function() {

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
};

$.apiGetMany = function() {

	console.log("GET MANY!!");

	var self = this;

	var last = self.post.last;
       	var index = self.post.index;
        var type = self.post.type;
	var limit = self.post.limit;
	var group = self.post.group;
	
	common.EBGetMany(self, last, index, type, group, limit, function(results) {

		if(results.success == false) {
			
			self.view500(results.message);
			
		} else {

			self.json(results);
		}
	});
};

$.apiGetManyByDateRange = function() {

	var self = this;

	var from = self.post.from;
	var to = self.post.to;
	var last = self.post.last;
	var index = self.post.index;
	var type = self.post.type;
	var limit = self.post.limit;
	var group = self.post.group;

	common.EBGetManyByDateRange(self, from, to, last, index, type, group, limit, function(results) {

		if(results.success == false) {
			
			self.view500(results.message);
			
		} else {

			self.json(results);
		}
	});
};

$.apiDeleteByURI = function() {

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
};
