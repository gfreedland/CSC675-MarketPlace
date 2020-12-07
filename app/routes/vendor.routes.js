module.exports = app => {
  const vendor = require("../controllers/vendor.controller.js");

  var router = require("express").Router();

  // Create a new Venfor
  router.post("/", vendor.create);

  // Retrieve all Vendors
  router.get("/", vendor.findAll);

  // Retrieve all retail Vendors
  router.get("/retail", vendor.findAllRetail);
  
  // Retrieve all personal Vendors
  router.get("/personal", vendor.findAllPersonal);

  // Retrieve a single Vendor with id
  router.get("/:id", vendor.findOne);

  // Update a Vendor with id
  router.put("/:id", vendor.update);

  // Delete a Vendor with id
  router.delete("/:id", vendor.delete);

  // Delete all Vendors
  router.delete("/", vendor.deleteAll);

  app.use('/api/vendor', router);
};