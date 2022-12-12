const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes");

module.exports = app => {
	app.use(userRoutes);
	app.use(bookRoutes);
}