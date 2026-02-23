// This file is about configuring the Express server
// any routes, middleware, settings, etc, belongs in here!

const express = require("express");
const { exampleMiddleware, otherExampleMiddleware, middlewareThatEndsEarly, doCrazierMath, doCrazyMath } = require("./middleware/ExampleMiddlewareFunctions");

const {body, validationResult} = require("express-validator");

const app = express();

// app.use is another syntax for middleware
// It applies to ALL routes on app
app.use(express.json());
// router.use would make middleware that runs on 
// all routes within that router 




// http://localhost:3000/
// GET http://localhost:3000/
app.get("/", (request, response) => {
	response.json({
		message:"Hello, world!"
	});
});

// GET http://localhost:3000/bananas
app.get("/bananas", (request, response) => {
	let result = exampleFunction();
	response.json({
		message:"Hello, world!",
		result: result
	});
});

// GET http://localhost:3000/oranges
app.get("/oranges", (request, response) => {
	let result = exampleFunction();
	response.json({
		message:"Hello, world!",
		result: result
	});
});

function exampleFunction(){
	return 1 + 1;
}

// app.verb(path, function);

/* app.verb(
	path,
	function,
		next()
	function,
		next()
	function,
		next()
	function,
		response.json(some early exit of the route handler)
	function
		response.json but we never reach here, because the previous function responds instead
	)


*/

app.get(
	"/middlewareExample", 

	// This is a middleware function! 
	// It is middleware because it can call next()
	(request, response, next) => {
		console.log("middleware activated!");
		next();
	},
	exampleMiddleware,
	otherExampleMiddleware,
	// middlewareThatEndsEarly,
	doCrazyMath,
	doCrazierMath,
	
	// This is the final callback in the chain, 
	// because it does NOT have the ability to call next().
	(request, response) => {
		response.json({
			message:"Middleware route has completed!",
			crazyMathResult: request.customData.crazyMathResult,
			crazierMathResult: request.customData.crazierMathResult
		})
	}
);


/*

app.verb(
	"/login",
	checkUsername,
	checkPassword,
	generateJwt,
	emailUser,
	async (request, response) => {
		response.json({
			jwt: request.customDataResult.jwt
		})	
	})
);

*/

// This saves username and password as query string properties, 
// DO NOT DO THIS!! It is not secure!!
// http://localhost:3000/users/register?username=blah&password=bananas

// POST http://localhost:3000/users/register
// body data = {email, password}
app.post("/users/register",
	// validate incoming email address
	body('email').isEmail().normalizeEmail(),
	// validate incoming password
	// create user in DB
	// create JWTs

	(request, response, next) => {
		const errors = validationResult(request);
		// if errors is NOT empty, there are errors to process!
		if (!errors.isEmpty()){
			console.log(errors);
			// return helps to ensure this exits early and cleanly
			// preventing a server crash from trying to respond 
			// on an already-finished response
			// return response.json({
			// 	errors: errors.array()
			// });
			// Provide an error to next() 
			// and that will jump to your error-handling middleware
			return next(new Error(JSON.stringify(errors)));
		}

		// How to fix request.body????
		console.log(request.body.email);

		response.json({
			message: "Successful user registration happend here! Believe us!",
			data: request.user
		});
	}
);

// On every route, handle errors that have occurred and respond in a D.R.Y way
// This middleware is like a Catch block for the whole app!
app.use((error, request, response, next) => {
	// Check request.body.errors for any errors that have occured
	if (request.body.errors || error){
		console.log("Errors occured!");
		console.log(error);
		console.log(request.body.errors);
	}

	// Send the errors to your company's logging/analytics platform 
	// Send a request to a fallback server to warm it up in case it's needed
	// etc etc, do whatever you want based on the existence of errors
	// before you respond!

	
	// Send request.body.errors as a response
	response.json({
		errors: request.body.errors || error.message
	});
});

module.exports = {
	app
}