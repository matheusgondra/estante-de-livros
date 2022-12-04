const express = require("express");
const routes = require("./routes");
const strategy_local = require("./middlewares/passport-local");

const app = express();

app.use(express.json());

routes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});