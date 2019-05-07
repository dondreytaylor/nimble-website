// Dependencies
var Boom    = require('boom');
var Joi     = require('joi');
var Path    = require('path');
var Hapi    = require('hapi');
var Vision 	= require('vision');
var Inert 	= require('inert');

// Configurations
var Config = require('./config.js');

// MongoDB
var mongojs 		= require('mongojs');
var db 					= mongojs(Config.Database.uri);

// Generate an alpha numeric string
let getAlphaString = function(length) {
    	var result = '';
			var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    	return result;
};


// SendGrid setSubstitutionWrappers
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(Config.SendGrid.key);
sgMail.setSubstitutionWrappers('{{', '}}');

// SendGrid: Confirmation email
let sendORDERConfirmationEmail = function(email, ordernumber, invitecode) {
		var message = {
				from: Config.SendGrid.from,
				templateId: Config.SendGrid.orderTemplateId,
				personalizations: [{
						to: [{email: email}],
						dynamic_template_data: {
							ordernumber: ordernumber,
							invitelink: "https://" + Config.Site.url + "/invite/" + invitecode
						}
				}]
		};
		sgMail.send(message, function() {
		});
};

// SendGrid: Confirmation email
let sendORDERTOADMINS = function(form) {
		var data = form || {}
		data.coinname = form["coin[name]"];
		console.log(form);
		console.log(data);

		var message = {
				from: Config.SendGrid.from,
				templateId: Config.SendGrid.orderAdminTemplateId,
				personalizations: [{
						to: Config.NotifyEmails.orders,
						dynamic_template_data: data
				}]
		};
		sgMail.send(message);
};

// Template Engine
var Handlerbars = require('handlebars');
var HandlebarsLayouts = require('handlebars-layouts');
HandlebarsLayouts.register(Handlerbars);

// HTTP Server
var server = Hapi.server({
	 	port: Config.Site.port,
	  routes: {
			cors: {
				credentials: true
			}
	 }
});

// HTTP Server Initialization Configuration
var initialization = async function() {

	// Register modules
	await server.register(Vision);
	await server.register(Inert);

	// Setup view rendering
	server.views({
			engines: {
					html: {
						module: Handlerbars
					}
			},
			relativeTo: Path.join(__dirname, 'public'),
			path: './views',
			partialsPath: './views'
	});

	// Base HTTP route
	server.route({
			method: 'GET',
			path: '/',
			handler: function(request, reply)
			{
					return reply.view('embed-base', {meta: Config.Meta});
			}
	});

	// Handles public file routing
	server.route({
	    method: 'GET',
	    path: '/static/{param*}',
	    handler: {
	        directory: {
	            path: 'public',
	            listing: true
	        }
	    }
	});

	// Base HTTP route
	server.route({
			method: 'GET',
			path: '/{param*}',
			handler: function(request, reply)
			{
					return reply.view('embed-base', {});
			}
	});

	// Handles coin requests
	server.route({
			method: 'POST',
			path: '/api/coinrequest',
			handler: function(request, reply)
			{
					let xFF = request.headers['x-forwarded-for']
					let ip = xFF ? xFF.split(',')[0] : request.info.remoteAddress;

					let form = request.payload || {}
					form.ip = ip;
					form.added = (new Date());
					db.collection("CoinRequests").insert(form);
					return {success:true};
			}
	});

	// Handles reservations/pre-orders
	server.route({
			method: 'POST',
			path: '/api/reserve',
			handler: function(request, reply)
			{
					let xFF = request.headers['x-forwarded-for']
					let ip = xFF ? xFF.split(',')[0] : request.info.remoteAddress;

					let form = request.payload || {}
					form.ip = ip;
					form.added = (new Date());
					form.ordernumber = (getAlphaString(4) + "-" + getAlphaString(4) + "-" + getAlphaString(4)).toUpperCase();
					form.referralcode = (getAlphaString(8)).toUpperCase();
					db.collection("Reserves").insert(form)
					sendORDERConfirmationEmail(form.email, form.ordernumber, form.referralcode);
					sendORDERTOADMINS(form);
					return {success:true, ordernumber:form.ordernumber, referralcode:form.referralcode};
			}
	});

	// Handles check order status
	server.route({
			method: 'POST',
			path: '/api/checkstatus',
			handler: function(request, reply)
			{
					return new Promise(function(resolve) {
							let form = request.payload || {}
							db.collection("Reserves").find({ordernumber:form.ordernumber}, function(err, orders) {
										if (err || orders.length == 0) resolve({error: true});
										else if (orders.length > 0) {
												db.collection("Reserves").find({"added": {$lt: new Date(orders[0].added)}}, function(err, ordersAhead) {
															if (err) resolve({error: true});
															else {
																	resolve({status:orders[0].status || "", ordersAhead:ordersAhead.length});
															}
												});
										}
							});
					});
			}
	});

	// Attempt to start the HTTP Server
	try {
			await server.start();
			console.log("RUNNING WEBSITE", Config.Site.url, "on port",  Config.Site.port);
	}
	catch (err) {
			process.exit(1);
	}
};

// Initilize HTTP Server
initialization();
