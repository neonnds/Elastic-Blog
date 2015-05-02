//Override elastic-core pages
var $ = module.exports = require('../elastic-core/pages.js');

$.apiGetMany = {
	uri: '/api/get-many',
	options: ['post'],
	label: 'API Get Many.'
};

$.apiGetManyByDateRange = {
	uri: '/api/get-many-by-date-range',
	options: ['post'],
	label: 'API Get Many By Date Range.'
};

$.apiGetByURI = {
	uri: '/api/get-by-uri',
	options: ['post'],
	label: 'API Get By URI'
};

$.apiSavePost = {
	uri: '/api/save-post',
	options: ['post', 'authorize'],
	label: 'API Save Post.'
};

$.apiSaveQuote = {
	uri: '/api/save-quote',
	options: ['post', 'authorize'],
	label: 'API Save Quote.'
};

$.apiDeleteByURI = {
	uri: '/api/delete',
	options: ['post', 'authorize'],
	label: 'Delete.'
};

$.apiRegister = {
	uri: '/api/register',
	options: ['unauthorize', 'post'],
	label: 'API Register',
	active: true
};

$.default = {
	label: 'Elastic Blog',
	views: [
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	above: [],
	below: []
};

$.error = {
	uri: '/error',
	options: [],
	label: 'Error Occured',
	views: [
		{"body" : 'elastic-blog/error.html'},
		{'defaultjs' : 'elastic-blog/default.js'},
		{'default' : 'elastic-blog/default.html'}
	],
	above: [],
	below: []
};

$.home = {
	uri: '/',
	label: 'Home',
	views: [
		{'homejs' : 'elastic-blog/home.js'}, 
		{'body' : 'elastic-blog/home.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	options: ['get'],
	above: [],
	below: []
};

$.homeByYear = {
	uri: '/year/{year}',
	base: '/year',
	label: 'Home',
	views: [
		{'homejs' : 'elastic-blog/home.js'}, 
		{'body' : 'elastic-blog/home.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	options: ['unauthorize'],
	above: [],
	below: []
};

$.newPost = {
	uri: '/save-post',
	label: 'Save Post',
	views: [
		{'savePostjs' : 'elastic-blog/savePost.js'}, 
		{'body' : 'elastic-blog/savePost.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	options: ['authorize', 'get'],
	above: [],
	below: []
};

$.updatePost = {
	uri: '/save-post/{uri}',
	base: '/save-post',
	label: 'Save Post',
	views: [
		{'savePostjs' : 'elastic-blog/savePost.js'}, 
		{'body' : 'elastic-blog/savePost.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	options: ['authorize', 'get'],
	above: [],
	below: []
};

$.newQuote = {
	uri: '/save-quote',
	label: 'Save Quote',
	views: [
		{'saveQuotejs' : 'elastic-blog/saveQuote.js'}, 
		{'body' : 'elastic-blog/saveQuote.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	options: ['authorize', 'get'],
	above: [],
	below: []
};

$.updateQuote = {
	uri: '/save-quote/{uri}',
	base: '/save-quote',
	label: 'Save Quote',
	views: [
		{'saveQuotejs' : 'elastic-blog/saveQuote.js'}, 
		{'body' : 'elastic-blog/saveQuote.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	options: ['authorize', 'get'],
	above: [],
	below: []
};

$.viewPost = {
	uri: '/view-post/{uri}',
	label: 'View Post',
	views: [
		{'viewjs' : 'elastic-blog/view.js'}, 
		{'body' : 'elastic-blog/view.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	options: ['get'],
	above: [],
	below: []
};

$.viewQuotes = {
	uri: '/view-quotes',
	options: ['authorize'],
	label: 'View Quotes',
	views: [
		{'viewQuotejs' : 'elastic-blog/viewQuotes.js'}, 
		{'body' : 'elastic-blog/view.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	above: [],
	below: []
};

$.search = {
	uri: '/search/{query}',
	base: '/search',
	label: 'Search',
	views: [
		{'homejs' : 'elastic-blog/home.js'}, 
		{'body' : 'elastic-blog/home.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	options: ['get'],
	above: [],
	below: []
};

$.register = {
	uri: '/register',
	options: [],
	label: 'Register',
	active: true
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
