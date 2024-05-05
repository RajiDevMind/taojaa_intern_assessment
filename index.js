const express = require("express");
const bodyParser = require("body-parser");
const { engine } = require("express-handlebars");
const routes = require("./routes/handlers");
const methodOverride = require("method-override");

const port = process.env.PORT || 5000;
const app = express();

// express.static file pointing to public folder dir to access css files
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// Configure Handlebars as the view engine
app.engine("handlebars", engine());
app.set("view-engine", "handlebars");

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is listening on port http://localhost:${port}...`);
});
