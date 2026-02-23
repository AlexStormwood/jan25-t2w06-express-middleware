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

module.exports = {
	app
}