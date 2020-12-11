const db = require('./app/models');
const vendorController = require('./app/controllers/vendor.controller');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = __dirname + '/react-crud/build/';

const app = express();

app.use(express.static(path));

const corsOptions = {
  origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

const run = async () => {
  /*
  * This is where values get loaded dynamically when the sever starts
  * After table creation.
  */
  const body = {
    vname: 'Costco',
    vtype: 'Retail',
    vaddress: '123 Cost Way, San Francisco CA, 94132',
    vemail: 'costcosupplies@costco.com',
  }; 
  const vendor1 = await vendorController.createV(body);
  const vendor2 = await vendorController.createV({
    vname: 'Safeway',
    vtype: 'Retail',
    vaddress: '123 Safe Way, San Francisco CA, 94132',
    vemail: 'safewaysupplies@safeway.com',
  });
  const vendor3 = await vendorController.createV({
    vname: 'John Smith',
    vtype: 'Personal',
    vaddress: '111 Random Way, Daly City CA, 94012',
    vemail: 'jsmith@test.com',
  });
};

// Sync With Database
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});

// Redirects to front end index.html
app.get('/', function (req, res) {
  // run(req, res);
  res.sendFile(path + "index.html");
});

require("./app/routes/vendor.routes")(app);
require("./app/routes/customer.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
