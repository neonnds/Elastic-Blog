var $ = exports;

$.apiSearch = {
	uri: '/api/search',
	controller: 'elastic-blog/api.js',
	flags: ['post'],
	priority: 1,
	label: 'Search.'
};

$.apiGetMany = {
	uri: '/api/get-many',
	controller: 'elastic-blog/api.js',
	flags: ['post'],
	priority: 1,
	label: 'API Get Many.'
};

$.apiSavePost = {
	uri: '/api/save-post',
	controller: 'elastic-blog/api.js',
	flags: ['post', 'authorize'],
	label: 'API Save Post.'
};

$.error = {
	uri: '/error',
	controller: 'elastic-core/default.js',
	flags: [],
	priority: 1,
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

$.postLogin = {
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
