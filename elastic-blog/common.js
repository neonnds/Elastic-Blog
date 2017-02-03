var F = require('total.js');
var cuid = require('cuid');
var emailer = require('nodemailer');

var $ = module.exports = require('../elastic-core/common.js');


F.once('load', function() {

	$.defaultLimit = F.config['default-item-limit'];

	$.defaultTheme = F.config['default-theme'];

	console.log(`LOADING ELASTIC-BLOG WITH THEME ${$.defaultTheme}`);

	var pages = require(`./${$.defaultTheme}-pages.js`);

	$.registerPages(pages);

	$.processRoutes();
});


$.EBSendEmail = function(toEmail, subject, textContent, htmlContent) {

	/* create reusable transporter object using the default SMTP transport */
	var connection = `smtps:\/\/${F.config['smtp-username']}:${F.config['smtp-password']}@${F.config['smtp-domain']}`;
	var transporter = emailer.createTransport(connection);

	/* setup e-mail data with unicode symbols */
	var mailOptions = {
		from: `"Elastic-Blog" <${F.config['smtp-username']}>`, // sender address
		to: toEmail, // list of receivers
		subject: subject, // Subject line
		text: textContent, // plaintext body
		html: htmlContent // html body
	};
	
	/* send mail with defined transport object */
	transporter.sendMail(mailOptions, function(error, info) {

		if(error) {
			return console.log(error);
		}

		console.log('Message sent: ' + info.response);
	});	
};


$.EBGeneratePin = function(pinLength) {

	var pinCodeArray = []

	if(!pinLength) {
		throw new Error('Missing required param: pinLength')
	}

	if(pinLength !== parseInt(pinLength, 10) || parseInt(pinLength, 10) < 0) {
		throw new Error('pinLength is not a whole number')
	}

	for(var i = 0; i < pinLength; i++) {
		pinCodeArray.push(Math.floor(Math.random() * 10))
	}

	return pinCodeArray.join('')
}


$.EBSavePost = function(data, callback) {

	var constraints = {
		"_key": {
			presence: {
				allowEmpty: true
			}
		},
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
	  	},
		"_content": {
			presence: true,
			length: {
				minimum: 4
			}
		},	
		"_tags": {
			presence: {
				allowEmpty: true
			}
		}
	};

	var failed = $.validate(data, constraints, {format: "flat"});

	if(failed != undefined) {

		callback({"success" : false, "message" : failed});

		return;
	}

	var query;

	if(data._key != "") {

		query = [`_key = "${data._key}"`];		

	} else {
		
		query = [`_type = "post"`, `_uri = "${data._uri}"`];
	}

	$.ECGet(query, 1, [], [], [], function(result) {

		if(result.error == true) {

			callback({"success" : false, "message" : "An unexpected error occured!"});
		}

		/* Existing document so do merge update */
		if(result.success == true) {
			
			var post = result.message[0];

			/* Can only update what you own */
			if(post._user != data._user) {

				callback({"success" : false, "message" : "The URI or KEY is already in use by another user!"});

				return;

			} else {

				/* Make sure the provided and retrieved documents are the same */
				data._key = post._key;
			}
		}

		$.ECStore(data._key, data, function(results) {

			callback(results);
		});
	});
};

