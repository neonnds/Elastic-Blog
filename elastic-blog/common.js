var framework = require('total.js');
var cuid = require('cuid');

var db = require('./database.js');

var defaultLimit = framework.config["default-item-limit"];

var $ = module.exports = require('../elastic-core/common.js');


$.EBGetByURI = function(self, uri, index, type, callback)
{
	var body = {};
	
	body.query = {
		"match" : { 
			"uri" : uri 
		}
	};

	db.client.search({
		index: index,
		type: type,
		size: 10,
		body: body
	}, function (error, response) {
	
		console.log(response);

		if(error == null && response.hits.hits.length == 1) {

			callback({ success: true, message: response.hits.hits.pop()._source }); 

		} else {

			callback({success: false, message: "An error has occurred."});
		}
	});
};

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
				"must" : []
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

$.EBSave = function(self, data, index, type, callback)
{
	var body = {};

	var keys = Object.keys(data);

        for(var i = 0; i < keys.length; i++) {
	
		body[keys[i]] = data[keys[i]];
	}

	body.updated = new Date().format('yyyy/MM/dd');

	$.EBGetByURI(self, body.uri, index, type, function(result) { 

		//Exists		
		if(result.success == false) {
			body.key = cuid();
			body.created = new Date().format('yyyy/MM/dd');
		} else {
			body.key = result.message.key;
			body.created = result.message.created;
		}
		
		db.client.index({
			index: index,
			type: type,
			id: body.key,
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

$.EBDelete = function(self, uri, index, type, callback)
{
	db.client.delete({
		index: index,
		type: type,
		id: uri,
		refresh: true
	}, function (err, response) {

		if(err == null) {

			callback({success: true, message: "Deleted."});

		} else {

			callback({success: false, message: "Failed to delete."});
		}
	});
};
