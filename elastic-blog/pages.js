var $ = exports;

$.apiGetMany = {
	uri: '/api/get-many',
	controller: 'elastic-blog/api.js',
	flags: ['post'],
	label: 'API Get Many.'
};

$.apiGetManyByDateRange = {
	uri: '/api/get-many-by-date-range',
	controller: 'elastic-blog/api.js',
	flags: ['post'],
	label: 'API Get Many By Date Range.'
};

$.apiGetByURI = {
	uri: '/api/get-by-uri',
	controller: 'elastic-blog/api.js',
	flags: ['post'],
	label: 'API Get By URI'
};

$.apiSavePost = {
	uri: '/api/save-post',
	controller: 'elastic-blog/api.js',
	flags: ['post', 'authorize'],
	label: 'API Save Post.'
};

$.apiDeleteByURI = {
	uri: '/api/delete',
	controller: 'elastic-blog/api.js',
	flags: ['post', 'authorize'],
	label: 'Delete.'
};

$.error = {
	uri: '/error',
	controller: 'elastic-core/default.js',
	flags: [],
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
	controller: 'elastic-blog/home.js',
	flags: ['get'],
	priority: 1,
	label: 'Home',
	views: [
		{'homejs' : 'elastic-blog/home.js'}, 
		{'body' : 'elastic-blog/home.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	above: [],
	below: []
};

$.homeByYear = {
	uri: '/year/{year}',
	controller: 'elastic-blog/home.js',
	base: '/year',
	label: 'Home',
	views: [
		{'homejs' : 'elastic-blog/home.js'}, 
		{'body' : 'elastic-blog/home.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	flags: ['get'],
	above: [],
	below: []
};

$.newPost = {
	uri: '/save-post',
	controller: 'elastic-blog/savePost.js',
	label: 'Save Post',
	views: [
		{'savePostjs' : 'elastic-blog/savePost.js'}, 
		{'body' : 'elastic-blog/savePost.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	flags: ['authorize', 'get'],
	above: [],
	below: []
};

$.updatePost = {
	uri: '/save-post/{uri}',
	controller: 'elastic-blog/savePost.js',
	base: '/save-post',
	label: 'Save Post',
	views: [
		{'savePostjs' : 'elastic-blog/savePost.js'}, 
		{'body' : 'elastic-blog/savePost.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	flags: ['authorize', 'get'],
	above: [],
	below: []
};

$.viewPost = {
	uri: '/view-post/{uri}',
	controller: 'elastic-blog/viewPost.js',
	label: 'View Post',
	views: [
		{'viewjs' : 'elastic-blog/view.js'}, 
		{'body' : 'elastic-blog/view.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	flags: ['get'],
	above: [],
	below: []
};

$.search = {
	uri: '/search/{query}',
	controller: 'elastic-blog/search.js',
	base: '/search',
	label: 'Search',
	views: [
		{'homejs' : 'elastic-blog/home.js'}, 
		{'body' : 'elastic-blog/home.html'}, 
		{'defaultjs' : 'elastic-blog/default.js'}, 
		{'default' : 'elastic-blog/default.html'}
	],
	flags: ['get'],
	above: [],
	below: []
};

$.getLogin = {
	active: false,
	priority: 1
};

$.getRegister = {
	active: false,
	priority: 1
};

/*
$.apiRegister = {
	uri: '/api/register',
	flags: ['post', 'unauthorize'],
	label: 'API Register',
	priority: 1,
	active: false
};
*/



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
