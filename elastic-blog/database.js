var db = require('../elastic-core/database.js');

exports.client = db.client;

db.client.indices.create({

	index: 'posts',

	body : {
		"mappings" : {
			"post" : {
				"properties" : {
					"key" : {"type" : "string", "index" : "not_analyzed", "null_value" : "na"},
					"uri" : {"type" : "string", "null_value" : "na", "index" : "not_analyzed"},
					"user" : {"type" : "string", "null_value" : "na", "index" : "not_analyzed"},
					"live" : {"type" : "string", "null_value" : "na", "index" : "not_analyzed"},
					"group" : {"type" : "string", "null_value" : "na", "index" : "not_analyzed"},
					"content" : {"type" : "string", "null_value" : "na", "index" : "analyzed"},
					"updated" : {"type" : "date", "format" : "yyyy/MM/dd", "index" : "not_analyzed", "null_value" : "na"},
					"created" : {"type" : "date", "format" : "yyyy/MM/dd", "index" : "not_analyzed", "null_value" : "na"}
				}
			}
		}
	}

}, function(err, result) {});

/*
db.client.indices.create({

	index: 'comments',

	body : {
		"mappings" : {
			"comment" : {
				"properties" : {
					"key" : {"type" : "string", "index" : "not_analyzed", "null_value" : "na"},
					"uri" : {"type" : "string", "null_value" : "na", "index" : "analyzed"},
					"user" : {"type" : "string", "null_value" : "na", "index" : "analyzed"},
					"status" : {"type" : "string", "index" : "not_analyzed", "null_value" : "na"},
					"content" : {"type" : "string", "null_value" : "na", "index" : "analyzed"},
					"created" : {"type" : "date", "format" : "yyyy/MM/dd/SS", "index" : "analyzed", "null_value" : "na"}
				}
			}
		}
	}



}, function(err, result) {});
*/
