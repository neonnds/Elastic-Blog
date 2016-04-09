var framework = require('total.js');
var cuid = require('cuid');

var db = require('./database.js');
var pages = require('./pages.js');

var defaultLimit = framework.config["default-item-limit"];

var $ = module.exports = require('../elastic-core/common.js');

$.registerPages(pages);


$.EBSave = function(body, callback)
{
	body.updated = new Date().format('yyyy/MM/dd');

	$.EBGetById(body.id, 'posts', 'post', function(result) { 

		//Exists		
		if(result.success == false) {
			body.key = cuid();
			body.created = new Date().format('yyyy/MM/dd');
		} else {
			body.key = result.message.key;
			body.created = result.message.created;
		}
		
		$.EBIndex(body.uri, body, 'posts', 'post', callback); 
	});
};
