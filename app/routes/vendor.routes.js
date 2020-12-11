module.exports = app => {
  const vendor = require("../controllers/vendor.controller.js");

  var router = require("express").Router();

  // Create a new Vendor
  router.post("/", vendor.createVendor);

  // Retrieve all Vendors
  router.get("/", vendor.findAll);

  // Retrieve all retail Vendors
  router.get("/retail", vendor.findAllRetail);
  
  // Retrieve all personal Vendors
  router.get("/personal", vendor.findAllPersonal);

  // Retrieve a single Vendor with id
  router.get("/:id", vendor.findVendorById);

  // Update a Vendor with id
  router.put("/:id", vendor.update);

  // Delete a Vendor with id
  router.delete("/:id", vendor.delete);

  // Delete all Vendors
  router.delete("/", vendor.deleteAll);

  app.use('/api/vendor', router);
};