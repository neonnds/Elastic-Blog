var F = require('total.js');
var cuid = require('cuid');

var $ = module.exports = require('../elastic-core/common.js');

var db = require('./database.js');


F.once('load', function() {
 
	$.defaultLimit = F.config['default-item-limit'];

	$.defaultTheme = F.config['default-theme'];

	var pages = require('./' + $.defaultTheme + '-pages.js');

	$.registerPages(pages);

	$.processRoutes();	

	console.log("LOADED ELASTIC-BLOG WITH THEME " + $.defaultTheme);
});


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
		
		$.EBIndex(body.id, body, 'posts', 'post', callback); 
	});
};
