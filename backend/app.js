require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./src/database/connection");
const booksRoute = require("./src/routes/books");

/** Creating express instance*/
var app = express();

/** Adding middlewares */
app.use(bodyParser.json());
app.use(cors({ origin: process.env.ORIGIN_URL }));

/** Adding books route to the express in instance created */
app.use("/books", booksRoute);

const port = process.env.PORT || 3000;

/** Adding port to the newly created express server */
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
