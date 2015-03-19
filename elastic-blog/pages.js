var pages = require('../elastic-core/pages.js'); 

//Override elastic-core pages
module.exports = pages;

module.exports.apiGetMany = {
	uri: '/api/get-many',
	label: 'API Get Many.',
};

module.exports.apiGetByURI = {
	uri: '/api/get-by-uri',
	label: 'API Get By URI',
};

module.exports.apiGetManyByDateRange = {
	uri: '/api/get-many-by-date-range',
	label: 'API Get Many By Date Range.',
};

module.exports.apiSavePost = {
	uri: '/api/save-post',
	label: 'API Save Post.',
};

module.exports.apiSaveQuote = {
	uri: '/api/save-quote',
	label: 'API Save Quote.',
};

module.exports.apiDeleteByURI = {
	uri: '/api/delete',
	label: 'Delete.',
};

module.exports.default = {
	label: 'Elastic Blog',
	view: 'elastic-blog/default',
	above: [],
	below: []
};

module.exports.error = {
	uri: '/error',
	label: 'Error Occured',
	view: 'elastic-blog/error',
	above: [],
	below: []
};

module.exports.home = {
	uri: '/',
	label: 'Home',
	view: 'elastic-blog/home',
	above: [],
	below: []
};

module.exports.homeByYear = {
	uri: '/year/{year}',
	base: '/year',
	label: 'Home',
	view: 'elastic-blog/home',
	above: [],
	below: []
};

module.exports.newPost = {
	uri: '/save-post',
	label: 'Save Post',
	view: 'elastic-blog/savePost',
	above: [],
	below: []
};

module.exports.updatePost = {
	uri: '/save-post/{uri}',
	base: '/save-post',
	label: 'Save Post',
	view: 'elastic-blog/savePost',
	above: [],
	below: []
};

module.exports.newQuote = {
	uri: '/save-quote',
	label: 'Save Quote',
	view: 'elastic-blog/saveQuote',
	above: [],
	below: []
};

module.exports.updateQuote = {
	uri: '/save-quote/{uri}',
	base: '/save-quote',
	label: 'Save Quote',
	above: [],
	below: []
};

module.exports.viewPost = {
	uri: '/view-post/{uri}',
	label: 'View Post',
	view: 'elastic-blog/view',
	above: [],
	below: []
};

module.exports.viewQuotes = {
	uri: '/view-quotes',
	label: 'View Quotes',
	view: 'elastic-blog/viewQuotes',
	above: [],
	below: []
};

module.exports.search = {
	uri: '/search/{query}',
	base: '/search',
	label: 'Search',
	view: 'elastic-blog/search',
	above: [],
	below: []
};


//RELATIONSHIPS
/*
module.exports.home.below = [
	module.exports.search, 
	module.exports.newPost, 
	module.exports.newQuote, 
	module.exports.newFile, 
	module.exports.updatePost, 
	module.exports.updateQuote, 
	module.exports.viewPost, 
	module.exports.viewQuotes
];

module.exports.newPost.above = [module.exports.home];
module.exports.updatePost.above = [module.exports.home];
module.exports.newQuote.above = [module.exports.home];
module.exports.updateQuote.above = [module.exports.home];
module.exports.viewPost.above = [module.exports.home];
module.exports.viewQuotes.above = [module.exports.home];
module.exports.search.above = [module.exports.home];
module.exports.newFile.above = [module.exports.home];
module.exports.viewFiles.above = [module.exports.home];
*/
