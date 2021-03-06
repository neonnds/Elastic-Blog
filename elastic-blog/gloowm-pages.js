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

$.apiGetMyPosts = {
	uri: '/api/get-my-posts',
	controller: 'elastic-blog/api.js',
	flags: ['post', 'authorize'],
	priority: 1,
	label: 'API Get My Posts.'
};

$.apiGetPost = {
	uri: '/api/get-post',
	controller: 'elastic-blog/api.js',
	flags: ['post'],
	label: 'API Get Post.'
};

$.apiGetPostsByTag = {
	uri: '/api/get-posts-by-tag',
	controller: 'elastic-blog/api.js',
	flags: ['post'],
	label: 'API Get Posts By Tag.'
};

$.apiGetComments = {
	uri: '/api/get-post-comments',
	controller: 'elastic-blog/api.js',
	flags: ['post'],
	label: 'API Get Post Comments.'
};

$.apiGetTags = {
	uri: '/api/get-tags',
	controller: 'elastic-blog/api.js',
	flags: ['post'],
	label: 'API Get Tags.'
};

$.apiSavePost = {
	uri: '/api/save-post',
	controller: 'elastic-blog/api.js',
	flags: ['post', 'authorize'],
	label: 'API Save Post.'
};

$.apiImportPost = {
	uri: '/api/import-post',
	controller: 'elastic-blog/api.js',
	flags : ['+xhr', 'upload', 'post', 'authorize'],
	length: 819200,
	label: 'API Import Post.'
};

$.apiSaveComment = {
	uri: '/api/save-comment',
	controller: 'elastic-blog/api.js',
	flags: ['post'],
	label: 'API Save Comment.'
};

$.apiVerifyComment = {
	uri: '/api/verify-comment',
	controller: 'elastic-blog/api.js',
	flags: ['post'],
	label: 'API Verify Comment.'
};

$.apiSaveContact = {
	uri: '/api/save-contact',
	controller: 'elastic-blog/api.js',
	flags: ['post'],
	label: 'API Save Contact.'
};

$.apiVerifyContact = {
	uri: '/api/verify-contact',
	controller: 'elastic-blog/api.js',
	flags: ['post'],
	label: 'API Verify Contact.'
};

$.apiDeletePost = {
	uri: '/api/delete-post',
	controller: 'elastic-blog/api.js',
	flags: ['post', 'authorize'],
	label: 'API Delete Post.'
};

$.apiGetById = {
	active: false,
	priority: 1
};

$.apiDeleteById = {
	active: false,
	priority: 1
}

$.error = {
	uri: '/error',
	controller: 'elastic-core/default.js',
	flags: [],
	priority: 1,
	label: 'Error Occured',
	views: [
		{"body" : 'gloowm/error.html'},
		{'defaultjs' : 'gloowm/default.js'},
		{'default' : 'gloowm/default.html'}
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
		{'homejs' : 'gloowm/home.js'}, 
		{'body' : 'gloowm/home.html'}, 
		{'defaultjs' : 'gloowm/default.js'}, 
		{'default' : 'gloowm/default.html'}

	],
	above: [],
	below: []
};

$.homeByDate = {
	uri: '/date/{fromDate}/{toDate}',
	controller: 'elastic-blog/home.js',
	base: '/date',
	label: 'Home',
	views: [
		{'homejs' : 'gloowm/home.js'}, 
		{'body' : 'gloowm/home.html'}, 
		{'defaultjs' : 'gloowm/default.js'}, 
		{'default' : 'gloowm/default.html'}
	],
	flags: ['get'],
	above: [],
	below: []
};

$.exportPost = {
	uri: '/export-post/{uri}',
	base: '/export-post',
	controller: 'elastic-blog/savePost.js',
	flags: ['authorize', 'get'],
	label: 'Export Post.'
};

$.newPost = {
	uri: '/save-post',
	controller: 'elastic-blog/savePost.js',
	label: 'Save Post',
	views: [
		{'savePostjs' : 'gloowm/savePost.js'}, 
		{'body' : 'gloowm/savePost.html'}, 
		{'defaultjs' : 'gloowm/default.js'}, 
		{'default' : 'gloowm/default.html'}
	],
	flags: ['authorize', 'get'],
	above: [],
	below: []
};

$.updatePost = {
	uri: '/save-post/{type}/{uri}',
	controller: 'elastic-blog/savePost.js',
	base: '/save-post',
	label: 'Save Post',
	views: [
		{'savePostjs' : 'gloowm/savePost.js'}, 
		{'body' : 'gloowm/savePost.html'}, 
		{'defaultjs' : 'gloowm/default.js'}, 
		{'default' : 'gloowm/default.html'}

	],
	flags: ['authorize', 'get'],
	above: [],
	below: []
};

$.viewPost = {
	uri: '/view-post/{uri}',
	base: '/view-post',
	controller: 'elastic-blog/viewPost.js',
	label: 'View Post',
	views: [
		{'viewjs' : 'gloowm/view.js'}, 
		{'body' : 'gloowm/view.html'}, 
		{'defaultjs' : 'gloowm/default.js'}, 
		{'default' : 'gloowm/default.html'}
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
		{'homejs' : 'gloowm/home.js'}, 
		{'body' : 'gloowm/home.html'}, 
		{'defaultjs' : 'gloowm/default.js'}, 
		{'default' : 'gloowm/default.html'}
	],
	flags: ['get'],
	above: [],
	below: []
};

$.tags = {
	uri: '/tags/{tag}',
	controller: 'elastic-blog/search.js',
	base: '/tags',
	label: 'Tags Search',
	views: [
		{'homejs' : 'gloowm/home.js'}, 
		{'body' : 'gloowm/home.html'}, 
		{'defaultjs' : 'gloowm/default.js'}, 
		{'default' : 'gloowm/default.html'}
	],
	flags: ['get'],
	above: [],
	below: []
};

$.getLogin = {
	active: false,
	priority: 1
};

$.postLogin = {
	active: false,
	priority: 1
};

$.getRegister = {
	active: false,
	priority: 1
};

$.postRegister = {
	active: false,
	priority: 1
};

/*
$.apiRegister = {
	active: false,
	priority: 1
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
