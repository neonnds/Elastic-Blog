var db = require('../elastic-core/database.js');

exports.client = db.client;

db.client.indices.create({

	index: 'posts',

	body : {
		"mappings" : {
			"post" : {
				_id : {
					"path" : "uri",
					"store" : "true",
					"index" : "analyzed"
				},
				"properties" : {
					"key" : {"type" : "string", "index" : "analyzed", "null_value" : "na"},
					"uri" : {"type" : "string", "null_value" : "na", "index" : "analyzed"},
					"user" : {"type" : "string", "null_value" : "na", "index" : "analyzed"},
					"live" : {"type" : "string", "null_value" : "na", "index" : "analyzed"},
					"summary" : {"type" : "string", "null_value" : "na", "index" : "analyzed"},
					"content" : {"type" : "string", "null_value" : "na", "index" : "analyzed"},
					"created" : {"type" : "date", "format" : "yyyy/MM/dd", "index" : "analyzed", "null_value" : "na"}
				}
			}
		}
	}



}, function(err, result) {});


db.client.indices.create({

	index: 'quotes',

	body : {
		"mappings" : {
			"quote" : {
				_id : {
					"path" : "uri",
					"store" : "true",
					"index" : "analyzed"
				},
				"properties" : {
					"key" : {"type" : "string", "index" : "analyzed", "null_value" : "na"},
					"uri" : {"type" : "string", "null_value" : "na", "index" : "analyzed"},
					"user" : {"type" : "string", "null_value" : "na", "index" : "analyzed"},
					"content" : {"type" : "string", "null_value" : "na", "index" : "analyzed"},
					"created" : {"type" : "date", "format" : "yyyy/MM/dd", "index" : "analyzed", "null_value" : "na"}
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
				_id : {
					"path" : "uri",
					"store" : "true",
					"index" : "analyzed"
				},
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
