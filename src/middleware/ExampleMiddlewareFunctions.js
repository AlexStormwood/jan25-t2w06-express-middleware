


function exampleMiddleware(request, response, next) {
	console.log("middleware regular function activated!");
	next();
}

const otherExampleMiddleware = (request, response, next) => {
	console.log("middleware arrow function activated!");
	next();
}

function middlewareThatEndsEarly(request, response, next) {
	response.json({
		message:"Middleware has interrupted the usual route flow!"
	});
}

function doCrazyMath(request, response, next){
	let result = 1 + 1;

	if (!request.customData) {
		request.customData = {}
	}
	request.customData.crazyMathResult = result;
	// request.authentication.accessToken
	next();
}

// data is shared via request and response variables
// ALL middleware functions are given those variables automatically
// so any data assigned to one is available in the next middleware in the chain!
function doCrazierMath(request, response, next){
	if (!request.customData) {
		request.customData = {}
	}
	let result = request?.customData?.crazyMathResult * 100;
	request.customData.crazierMathResult = result;
	next();
}


module.exports = {
	exampleMiddleware,
	otherExampleMiddleware,
	middlewareThatEndsEarly,
	doCrazyMath,
	doCrazierMath
}