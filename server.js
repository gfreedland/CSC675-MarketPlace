const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const path = __dirname + '/react-crud/build/';

const app = express();

app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

// Sync With Database
const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// Redirects to front end index.html
app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

require("./app/routes/vendor.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
