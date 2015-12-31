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

	common.EBSave(data, function(results) {

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
	
	var body = {
		"query" : {
			"bool" : {
				"must" : [ 
					{ "match" : { "group" : group }} 
				]
			}
		}
	};

	if(from != "" && to != "") {
		body.query.bool.must.push({"range" : { "created" : { "from" : from, "to" : to }}});
	}

	if(self.user == null) {
		body.query.bool.must.push({"match" : { "live" : true }});
	}

	if(last != null && last != "") {
		body.query.bool.must.push({"range" : { "key" : { "lt" : last }}});
	}

	common.EBGetMany(index, type, body, limit, function(results) {

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

