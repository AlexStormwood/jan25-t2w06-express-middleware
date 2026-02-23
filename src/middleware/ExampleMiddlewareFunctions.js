


function exampleMiddleware(request, response, next) {
	console.log("middleware regular function activated!");
	next();
}

const otherExampleMiddleware = (request, response, next) => {
	console.log("middleware arrow function activated!");
	next();
}

module.exports = {
	exampleMiddleware,
	otherExampleMiddleware
}