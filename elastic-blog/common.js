var framework = require('total.js');
var cuid = require('cuid');

var db = require('./database.js');
var pages = require('./pages.js');

var defaultLimit = framework.config["default-item-limit"];

var $ = module.exports = require('../elastic-core/common.js');

$.registerPages(pages);


$.EBGetMany = function(self, last, index, type, group, limit, callback)
{
	var body = {
		"query" : {
			"bool" : {
				"must" : []
			}
		}
	};

	body.query.bool.must.push({"match" : { "group" : group }});
	
	if(self.user == null) {

		body.query.bool.must.push({"match" : { "live" : true }});
	}

	if(last != null && last != "") {

		body.query.bool.must.push({"range" : { "key" : { "lt" : last }}});
	}

	if(limit == null || limit == "") {
		limit = 0;
	}

	 //Check if submitted limit is within specified bounds
        if(limit < 1 || limit > defaultLimit) {

                limit = defaultLimit;
        } 


	db.client.search({
		index: index,
		type: type,
		sort: "key:desc",
		size: limit,
		body: body
	}, function (error, response) {

		if(error == null) {

			var items = [];

			for(var i = 0; i < response.hits.hits.length; i++) {

				items.push(response.hits.hits[i]._source);
			}

			callback({success: true, message: items}); 

		} else {

			callback({success: false, message: "An error has occurred."});
		}
	});
};

$.EBGetManyByDateRange = function(self, from, to, last, index, type, group, limit, callback)
{
	var body = {
		"query" : {
			"bool" : {
				"must" : [{"match" : { "group" : "summary" }}]
			}
		}
	};

	if(self.user == null) {

		body.query.bool.must.push({"match" : { "live" : true }});
	}

	body.query.bool.must.push({"range" : { "created" : { "from" : from, "to" : to }}});

	if(last != null && last != "") {

		body.query.bool.must.push({"range" : { "key" : { "lt" : last }}});
	}

	if(limit == null || limit == "") {
		limit = 0;
	}

	 //Check if submitted limit is within specified bounds
        if(limit < 1 || limit > defaultLimit) {

                limit = defaultLimit;
        } 

	db.client.search({
		index: index,
		type: type,
		sort: "key:desc",
		size: limit,
		body: body
	}, function (error, response) {

		if(error == null) {

			var items = [];

			for(var i = 0; i < response.hits.hits.length; i++) {

				items.push(response.hits.hits[i]._source);
			}

			callback({success: true, message: items}); 

		} else {

			callback({success: false, message: "An error has occurred."});
		}
	});
};

$.EBSave = function(self, body, callback)
{
	body.updated = new Date().format('yyyy/MM/dd');

	$.EBGetById(self, body.uri, 'posts', 'post', function(result) { 

		//Exists		
		if(result.success == false) {
			body.key = cuid();
			body.created = new Date().format('yyyy/MM/dd');
		} else {
			body.key = result.message.key;
			body.created = result.message.created;
		}
		
		db.client.index({
			index: 'posts',
			type: 'post',
			id: body.uri,
			body: body,
			refresh: true
		}, function(err, response) {

			if(err == null) {
				
				if(response.created == true) {

					callback({success: true, message: "Saved.", created: true});

				} else {

					callback({success: true, message: "Updated.", created: false});
				}	
				
			} else {

				callback({success: false, message: "An error has occurred.", created: false});
			}
		});
	});
};
