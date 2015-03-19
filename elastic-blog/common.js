var cuid = require('cuid');

var db = require('./database.js');

var defaultLimit = 50;

module.exports = require('../elastic-core/common.js');


module.exports.EBGetByURI = function(self, uri, index, type, callback)
{
	db.client.get({
		index: index,
		type: type,
		size: 1,
		id: uri
	}, function (error, response) {

		if(error == null && response._source !=  null) {

			callback({success: true, message: response._source}); 

		} else {

			callback({success: false, message: "An error has occurred."});
		}
	});
}

module.exports.EBGetMany = function(self, last, index, type, limit, callback)
{
	var body = {};

	if(last != null && last != "") {

		body.query = {
			"range" : {
				"key" : {
					"lt" : last
				}	
			}
		};
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
}

module.exports.EBGetManyByDateRange = function(self, from, to, last, index, type, limit, callback)
{
	var body = {};

	body.query = {

		"bool" : {
			"must" : [{
					"range" : {
						"created" : {
							"from" : from,
							"to" : to
						}
					}
				},
				{
					"range" : {
						"key" : {
							"lt" : last
						}	
					}
				}]
		}
	};

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
}

module.exports.EBSave = function(self, data, index, type, callback)
{
	var body = {};

	var keys = Object.keys(data);

        for(var i = 0; i < keys.length; i++) {
	
		body[keys[i]] = data[keys[i]];
	}

	body.key = cuid();
	body.created = new Date().format('yyyy/MM/dd');

	db.client.index({
		index: index,
		type: type,
		body: body
	}, function (err, response) {

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
}

module.exports.EBDelete = function(self, uri, index, type, callback)
{
	db.client.delete({
		index: index,
		type: type,
		id: uri
	}, function (err, response) {

		if(err == null) {

			callback({success: true, message: "Deleted."});

		} else {

			callback({success: false, message: "Failed to delete."});
		}
	});
}
