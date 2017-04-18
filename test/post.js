var F = require('total.js');
var common = require('../elastic-core/common.js');

common.defaultLimit = F.config['default-item-limit'];
common.defaultTheme = F.config['default-theme'];

var data = { 
 _key: '',
 _type: 'post',
 _uri: 'Will-To-Power-Test',
 _content: 'this is a test',
 _user: 'ADMIN@CONSTRINGACY.COM',
 _tags: [ 'summary' ],
 _created: '2017-04-17 09:05:45.4545',
 _updated: '2017-04-18 05:16:22.2222' 
};

/* Test store new */
common.ECStore('', data, function(result) {

	console.log("STORE RESULT:");
	console.log(result);

	data._content = 'this has been updated';

	/* Test merge update */
	common.ECStore(data["_key"], data, function(result) {

		console.log("MERGE UPDATE RESULT:");
		console.log(result);

		/* Test get */
		common.ECGet([`_key = "${data._key}"`], 100, [], [], [], function(result) {

			console.log("GET RESULT:");
			console.log(result);

			/* Test delete 
			common.ECDelete(data["_key"], function(result) {

				console.log("DELETE RESULT:");
				console.log(result);
			});
			*/
		});
	});
});

/*
common.ECSearch('^2016-09', 'users', 'created', '5', function(result) {

	console.log(result);
});
*/
