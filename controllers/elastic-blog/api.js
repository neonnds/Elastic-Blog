var $ = exports;

var common = require('../../elastic-blog/common.js');

var crypto = require('crypto');


$.apiSavePost = function() {

	var self = this;

	var uri = self.post.uri;
	var content = self.post.content;
	var tags = self.post["tags[]"];
	var user = self.user._id;

	var data = {'_key' : '', '_type' : 'post', '_uri' : uri, '_content' : content, '_user' : user, '_tags' : tags};

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

		common.ECGet([`_type = "post"`, `_uri = "${uri}"`], 1, [], [], [], function(result) {

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

	var query = [`_type = "post"`, `_uri = "${uri}"`, `_user = "${user}"`];

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

	var query = [`_type = "post"`, `"${category}" IN _tags`, `"live" IN _tags`];

	common.ECGet(query, limit, last, range, order, function(results) {

		if(results.success == false) {
			
			self.view404("No posts found!");
			
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
	var query;

	if(category == "other") {
		query = [`_type = "post"`, `"quote" NOT IN _tags`, `"summary" NOT IN _tags`, `"article" NOT IN _tags`, `_user = "${user}"`];
	} else {
		query = [`_type = "post"`, `"${category}" IN _tags`, `_user = "${user}"`];
	}

	common.ECGet(query, limit, last, range, order, function(results) {

		if(results.success == false) {
			
			self.view404("No posts found!");
			
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

	common.ECGet([`_type = "post"`, `_uri = "${uri}"`], 1, [], [], [], function(result) {

		if(result.success == false) {
			
			self.view404("Could not get post with given URI!");
			
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

	common.ECGet([`_type = "post"`, `_key = "${key}"`], 1, [], [], [], function(result) {

		if(result.success == false) {
			
			self.view404("Could not find the given post!");
			
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

			common.ECGet([`_type = "comment"`, `_parent_post = "${post._key}"`, `_verified = "true"`], limit, last, [], order, function(result) {

				if(result.success == false) {
					
					self.view404("No comments found for the given post!");
					
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
 */
$.apiSaveComment = function() {

	var self = this;

	var key = self.post.key;
	var comment = self.post.comment;
	var name = self.post.name;
	var email = self.post.email;

	var data = { '_key' : '', 
		     '_type' : 'comment', 
		     '_parent_post' : key, 
		     '_comment' : comment, 
		     '_name' : name, 
		     '_email' : email, 
		     '_email_hash' : '', 
		     '_verified' : 'false', 
		     '_notify' : 'false',
		     '_pin' : common.generatePin(5) 
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
				pattern: "[aA-zZ0-9\\.\\s]+",
				flags: "i",
				message: "can only contain a-z, A-Z, Period (.), Space ( ), 0-9"
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

				common.sendEmail(data._email, 'Your PIN ✔', data._pin, data._pin); 

				self.json(results);
			}
		});

	} else {

		self.view500(failed);
	}
};


$.apiVerifyComment = function() {

	var self = this;

	var pin = self.post.pin;

	common.ECGet([`_type = "comment"`, `_pin = "${pin}"`, `_verified = "false"`], 1, [], [], [], function(result) {

		if(result.success == false) {
			
			self.view404("No comment found with that pin!");
			
		} else {

			var data = result.message.pop();

			data._verified = 'true';

			common.ECStore(data._key, data, function(result) {

				if(result.success == false) {
			
					self.view500("Failed to verify comment!");

				} else {

					self.json(result);
				}
			});
		}
	});
};


$.apiGetTags = function() {

	var self = this;

	var sql = "";
	sql += `SELECT DISTINCT tag FROM core as c UNNEST(c._tags) as tag WHERE c._type = "post" AND "summary" IN c._tags`;
        sql += ` AND "live" IN c._tags AND tag != "live" AND tag != "article" AND tag != "quote" AND tag != "summary"`;

	common.ECQuery(sql, function(result) {

		if(result.success == false) {
			
			self.view404("No tags found!");
			
		} else {

			self.json(result);
		}	
	});
};


$.apiGetPostsByTag = function() {

	var self = this;

	var tag = self.post.tag;

	var sql = `SELECT core.* FROM core WHERE _type = "post" AND "live" IN _tags AND "summary" IN _tags AND "${tag}" IN _tags`;

	common.ECQuery(sql, function(result) {

		if(result.success == false) {
			
			self.view404("No posts with the given tag found!");
			
		} else {

			self.json(result);
		}	
	});
};


$.apiSearch = function() {

	var self = this;

	var query = self.post.query;

	common.ECSearch(query, 10, function(results) {
 
		if(results.success == false) {
			
			self.view404(results.message);
			
		} else {

			var keys = [];

			for(var i = 0; i < results.message.length; i++) {

				var key = results.message[i].id;
	
			       	keys.push(`_key = "${key}"`);
			}

			/* Need to make sure we only return live posts */
			var sql = `SELECT core.* FROM core WHERE _type = "post" AND "live" IN _tags AND "summary" IN _tags AND (${keys.join(' OR ')})`;

			common.ECQuery(sql, function(result) {

				if(result.success == false) {
					
					self.view404("No results found!");
					
				} else {

					self.json(result);
				}	

			});
		}
	});
};
