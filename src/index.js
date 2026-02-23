console.log("Server start file is running!");

// import app from the server.js file
// because all server configuration happens over in that file
const {app} = require("./server.js");

app.listen(3000, () => {
	console.log("Server is running on port 3000!");
});