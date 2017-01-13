var $ = exports;

var common = require('../../elastic-blog/common.js');

var crypto = require('crypto');


$.apiSavePost = function() {

	var self = this;

	var uri = self.post.uri;
	var content = self.post.content;
	var live = self.post.live;
	var category = self.post.category;	
	var user = self.user._id;

	var data = {'_key' : '', '_type' : 'post', '_category' : category, '_uri' : uri, '_content' : content, '_user' : user, '_live' : live};

	var constraints = {
		"_uri": {
			presence: true,
			format: {
				pattern: "[aA-zZ0-9\-]+",
				flags: "i",
				message: "can only contain a-z, -, 0-9"
			},
	  		length: {
				minimum: 5
	  		}
	  	}
	};

	var failed = common.validate(data, constraints, {format: "flat"});

	if(failed == undefined) {

		common.ECGet({"_type" : 'post', "_uri" : uri}, 1, [], [], [], function(result) {

			if(result.error == true) {

				self.view500("An unexpected error occured!");

				return;
			}

			/* Existing document so do merge update */
			if(result.success == true) {
				
				var post = result.message[0];

				/* Can only update what you own */
				if(post._user == user) {

					data._key = post._key;

				} else {

					self.view500("The URI is already in use!");

					return;
				}
			}

			common.ECStore(data._key, data, function(results) {

				if(results.success == false) {
			
					self.view500("Failed to save post!");

				} else {

					self.json(results);
				}
			});
		});

	} else {

		self.view500(failed);
	}
};


$.apiDeletePost = function() {

	var self = this;

	var uri = self.post.uri;
	var user = self.user._id;

	var query = {'_type' : 'post', '_uri' : uri, '_user' : user};

	common.ECGet(query, 1, [], [], [], function(result) {

		if(result.success == false) {
			
			self.view500("Failed to find post with the provided URI.");

		} else {
	
			var post = result.message[0];

			common.ECDelete(post._key, function(result) {

				if(result.success == false) {
			
					self.view500("Failed to delete post!");

				} else {

					self.json(result);
				}
			});
		}
	});
};


/*
 * Get live posts.
 */
$.apiGetMany = function() {

	var self = this;

	var range = self.post["range[]"];
	var last = self.post["last[]"];
	var category = self.post.category;
	var order = self.post["order[]"];
	var limit = self.post.limit;

	var query = {'_type' : 'post', '_category' : category, '_live' : true};

	common.ECGet(query, limit, last, range, order, function(results) {

		if(results.success == false) {
			
			self.view500("Failed to get posts!");
			
		} else {

			self.json(results);
		}
	});
};


/*
 * Get posts based on the users identity.
 */
$.apiGetMyPosts = function() {

	var self = this;

	var range = self.post["range[]"];
	var last = self.post["last[]"];
	var category = self.post.category;
	var order = self.post["order[]"];
	var limit = self.post.limit;
	var user = self.user._id;

	var query = {'_type' : 'post', '_category' : category, '_user' : user};

	common.ECGet(query, limit, last, range, order, function(results) {

		if(results.success == false) {
			
			self.view500("Failed to get posts!");
			
		} else {

			self.json(results);
		}
	});
};


/*
 * Get a single post.
 */
$.apiGetPost = function() {

	var self = this;

	var uri = self.post.uri;

	common.ECGet({"_type" : 'post', "_uri" : uri}, 1, [], [], [], function(result) {

		if(result.success == false) {
			
			self.view500("Failed to get post with given URI!");
			
		} else {

			var post = result.message[0];

			/*
			 * If you own the post then you can view it. 
			 * If you do not own it then it has to be live to view. 
			 */
			if((self.user == null || self.user._id != post._user) && post.live == 'false') {
			
				self.view401("You do not have access to view this post.");		

				return;
			}

			self.json(result);
		}
	});
};


/*
 * Get comments for a single post.
 * -Need to implement a page that correlates all comments based on email into a single page
 */
$.apiGetComments = function() {

	var self = this;

	var key = self.post.key;
	var last = self.post["last[]"];
	var order = self.post["order[]"];
	var limit = self.post.limit;

	common.ECGet({"_type" : 'post', "_key" : key}, 1, [], [], [], function(result) {

		if(result.success == false) {
			
			self.view500("Failed to get the given post!");
			
		} else {

			var post = result.message[0];

			/*
			 * If you own the post then you can view it. 
			 * If you do not own it then it has to be live to view. 
			 */
			if((self.user == null || self.user._id != post._user) && post.live == 'false') {
			
				self.view401("You do not have access to view this post.");		

				return;
			}

			common.ECGet({'_type' : 'comment', '_parent_post' : post._key, '_verified' : 'false'}, limit, last, [], order, function(result) {

				if(result.success == false) {
					
					self.view500("Failed to get comments for the given post!");
					
				} else {

					var cleanMessage = result.message;

					for(var i = 0; i < cleanMessage.length; i++) {

						/* We want a nice human readable format */
						cleanMessage[i]._created = new Date(cleanMessage[i]._created).toDateString();

						/* We want to protect emails for privacy and security */
						cleanMessage[i]._email = "";
					}

					self.json(result);
				}
			});
		}
	});
};


/*
 * Need to implement:
 *	-IP post limits
 *	-Allow reaction +1/-1
 *	-Email confirmation required for each post (nodemailer)
 */
$.apiSaveComment = function() {

	var self = this;

	var key = self.post.key;
	var comment = self.post.comment;
	var name = self.post.name;
	var email = self.post.email;
	var notify = self.post.notify;

	if(notify == "ON") {
		notify = true;
	} else {
		notify = false;
	}

	var data = { '_key' : '', 
		     '_type' : 'comment', 
		     '_parent_post' : key, 
		     '_comment' : comment, 
		     '_name' : name, 
		     '_email' : email, 
		     '_email_hash' : '', 
		     '_verified' : 'false', 
		     '_notify' : notify
	};

	var constraints = {
		"_email": {
			presence: true,
	  		email: true,
		},
		"_name": {
			presence: true,
			format: {
				pattern: "[aA-zZ0-9\\s]+",
				flags: "i",
				message: "can only contain a-z, A-Z, Space, 0-9"
			},
	  		length: {
				minimum: 2,
				maximum: 20
	  		}
	  	},
		"_comment": {
			presence: true,
			format: {
				pattern: "[aA-zZ0-9\\s]+",
				flags: "i",
				message: "can only contain a-z, A-Z, Space, 0-9"
			},
	  		length: {
				minimum: 5,
				maximum: 280
	  		}
	  	}
	};

	var failed = common.validate(data, constraints, {format: "flat"});

	if(failed == undefined) {

		data._email_hash = crypto.createHash('md5').update(email).digest('hex');
		    
		common.ECStore(data._key, data, function(results) {

			if(results.success == false) {
		
				self.view500("Failed to save post!");

			} else {

				self.json(results);
			}
		});

	} else {

		self.view500(failed);
	}
};



/*
$.apiSearch = function() {

	var self = this;

	var query = self.post.query;
	var last = self.post.last;
	var fields = self.post["fields[]"];
	var limit = self.post.limit;
	var sort = self.post.sort;

	var filter = {
		"bool" : {
			"must" : [
				{ "match" : { "live" : "true" }},
				{ "match" : { "group" : "summary" }}
			]
		}
	};

	common.EBSearch(query, last, limit, fields, sort, 'posts', 'post', filter, function(results) {

		if(results.success == false) {
			
			self.view500(results.message);
			
		} else {

			self.json(results);
		}
	});
};
*/
