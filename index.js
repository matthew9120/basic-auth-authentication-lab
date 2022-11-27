// Requiring module
const express = require("express");
var path = require('path');

//this is the main app object - object - required for nodeJS
const app = express();

//this is the main action for the controller
function authentication(req, res, next) {
        //this is getting the authentication data from the request
	var authheader = req.headers.authorization;
	console.log(req.headers);

        //this is for the scenario when user tries to send a request without the authentication data
	if (!authheader) {
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err)
	}

        //this is preparing to authentication data for the simple verifing
	var auth = new Buffer.from(authheader.split(' ')[1],
	'base64').toString().split(':');
	//this is getting the user's request data
	var user = auth[0];
	var pass = auth[1];
	
	var validUser = 'admin';
	var validPassword = 'admin';

        //this is simple checking the validation of the username and the password
	if (user == validUser && pass == validPassword) {

		// If Authorized user
		next();
	} else {
	        //this is responding with the error code and message on validation error
		var err = new Error('You are not authenticated!');
		res.setHeader('WWW-Authenticate', 'Basic');
		err.status = 401;
		return next(err);
	}

}

// First step is the authentication of the client
app.use(authentication);
app.use(express.static(path.join(__dirname, 'public')));

// Server setup
app.listen((3000), () => {
	console.log("Server is Running");
});

