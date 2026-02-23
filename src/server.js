// This file is about configuring the Express server
// any routes, middleware, settings, etc, belongs in here!

const express = require("express");
const app = express();

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

	// This is the final callback in the chain, 
	// because it does NOT have the ability to call next().
	(request, response) => {
		response.json({
			message:"Middleware route has completed!"
		})
	}
);


module.exports = {
	app
}