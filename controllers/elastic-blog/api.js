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

	common.EBSave(self, data, function(results) {

		if(results.success == false) {
	
			self.view500(results.message);

		} else {

			self.json(results);
		}
	});
};

$.apiGetMany = function() {

	var self = this;

	var from = self.post.from;
	var to = self.post.to;
	var last = self.post.last;
       	var index = self.post.index;
        var type = self.post.type;
	var limit = self.post.limit;
	var group = self.post.group;
	
	common.EBGetMany(self, from, to, last, index, type, group, limit, function(results) {

		if(results.success == false) {
			
			self.view500(results.message);
			
		} else {

			self.json(results);
		}
	});
};

$.apiSearch = function() {

	var self = this;

	var filter = {
		"bool" : {
			"must" : [
				{ "match" : { "live" : "true" }},
				{ "match" : { "group" : "summary" }}
			]
		}
	};

	common.EBSearch(self, filter, function(results) {

		if(results.success == false) {
			
			self.view500(results.message);
			
		} else {

			self.json(results);
		}
	});
};

