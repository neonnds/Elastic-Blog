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

$.apiDeleteByURI = {
	uri: '/api/delete',
	options: ['post', 'authorize'],
	label: 'Delete.'
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
	options: ['get'],
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


//RELATIONSHIPS

$.home.below = [
	$.search, 
	$.newPost, 
	$.updatePost, 
	$.viewPost
];

$.search.above = [$.home];
$.newPost.above = [$.home];
$.updatePost.above = [$.home];
$.viewPost.above = [$.home];
