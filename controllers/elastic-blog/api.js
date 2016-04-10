var $ = exports;

var common = require('../../elastic-blog/common.js');

$.apiSavePost = function() {

	var self = this;

	var id = self.post.id;
	var content = self.post.content;
	var user = self.user.id;
	var live = self.post.live;
	var group = self.post.group;	

	var data = {'id' : id, 'content' : content, 'user' : user, 'live' : live, 'group' : group};

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
	var limit = self.post.limit;
	var group = self.post.group;
	var sort = self.post.sort;
	
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

	common.EBGetMany('posts', 'post', body, limit, sort, function(results) {

		if(results.success == false) {
			
			self.view500(results.message);
			
		} else {

			self.json(results);
		}
	});
};

$.apiSearch = function() {

	var self = this;

	var query = self.post.query;
	var last = self.post.last;
	var fields = self.post["fields[]"];
	var limit = self.post.limit;
	var sort = self.post.sort;

	var filter = {
		"bool" : {
			"must" : [
				{ "match" : { "live" : "true" }},
				{ "match" : { "group" : "summary" }}
			]
		}
	};

	common.EBSearch(query, last, limit, fields, sort, 'posts', 'post', filter, function(results) {

		if(results.success == false) {
			
			self.view500(results.message);
			
		} else {

			self.json(results);
		}
	});
};

