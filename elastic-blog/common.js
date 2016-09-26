var F = require('total.js');
var cuid = require('cuid');

var $ = module.exports = require('../elastic-core/common.js');


F.once('load', function() {

	$.defaultLimit = F.config['default-item-limit'];

	$.defaultTheme = F.config['default-theme'];

	console.log(`LOADING ELASTIC-BLOG WITH THEME ${$.defaultTheme}`);

	var pages = require(`./${$.defaultTheme}-pages.js`);

	$.registerPages(pages);

	$.processRoutes();	
});
