//Override elastic-core pages
var $ = module.exports = require('../elastic-core/pages.js');

$.apiGetMany = {
	uri: '/api/get-many',
	label: 'API Get Many.',
};

$.apiGetByURI = {
	uri: '/api/get-by-uri',
	label: 'API Get By URI',
};

$.apiGetManyByDateRange = {
	uri: '/api/get-many-by-date-range',
	label: 'API Get Many By Date Range.',
};

$.apiSavePost = {
	uri: '/api/save-post',
	label: 'API Save Post.',
};

$.apiSaveQuote = {
	uri: '/api/save-quote',
	label: 'API Save Quote.',
};

$.apiDeleteByURI = {
	uri: '/api/delete',
	label: 'Delete.',
};

$.default = {
	label: 'Elastic Blog',
	view: 'elastic-blog/default',
	above: [],
	below: []
};

$.error = {
	uri: '/error',
	label: 'Error Occured',
	view: 'elastic-blog/error',
	above: [],
	below: []
};

$.home = {
	uri: '/',
	label: 'Home',
	view: 'elastic-blog/home',
	above: [],
	below: []
};

$.homeByYear = {
	uri: '/year/{year}',
	base: '/year',
	label: 'Home',
	view: 'elastic-blog/home',
	above: [],
	below: []
};

$.newPost = {
	uri: '/save-post',
	label: 'Save Post',
	view: 'elastic-blog/savePost',
	above: [],
	below: []
};

$.updatePost = {
	uri: '/save-post/{uri}',
	base: '/save-post',
	label: 'Save Post',
	view: 'elastic-blog/savePost',
	above: [],
	below: []
};

$.newQuote = {
	uri: '/save-quote',
	label: 'Save Quote',
	view: 'elastic-blog/saveQuote',
	above: [],
	below: []
};

$.updateQuote = {
	uri: '/save-quote/{uri}',
	base: '/save-quote',
	label: 'Save Quote',
	above: [],
	below: []
};

$.viewPost = {
	uri: '/view-post/{uri}',
	label: 'View Post',
	view: 'elastic-blog/view',
	above: [],
	below: []
};

$.viewQuotes = {
	uri: '/view-quotes',
	label: 'View Quotes',
	view: 'elastic-blog/viewQuotes',
	above: [],
	below: []
};

$.search = {
	uri: '/search/{query}',
	base: '/search',
	label: 'Search',
	view: 'elastic-blog/search',
	above: [],
	below: []
};


//RELATIONSHIPS

$.home.below = [
	$.search, 
	$.newPost, 
	$.newQuote, 
	$.updatePost, 
	$.updateQuote, 
	$.viewPost, 
	$.viewQuotes
];

$.search.above = [$.home];
$.newPost.above = [$.home];
$.newQuote.above = [$.home];
$.updatePost.above = [$.home];
$.updateQuote.above = [$.home];
$.viewPost.above = [$.home];
$.viewQuotes.above = [$.home];
