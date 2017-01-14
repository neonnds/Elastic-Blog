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

$.sendEmail = function(toEmail, subject, textContent, htmlContent) {

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

$.generatePin = function(pinLength) {

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
