const db = require("../models");
const Vendor = db.vendor;
const Product = db.product;
const Op = db.Sequelize.Op;

// An initialization create
exports.createV = (vendor) => {
  return Vendor.create({
    vname: vendor.vname,
    vtype: vendor.vtype,
    vaddress: vendor.vaddress,
    vemail: vendor.vemail
  })
  .then((vendor) => {
    console.log(`Created vendor: ${vendor}`)
    return vendor;
  })
}

// Create and Save a new Vendor
exports.createVendor = (req, res) => {
  if (!req.body.vname) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Vendor
  const vendor = {
    vname: req.body.vname,
    vtype: req.body.vtype,
    vaddress: req.body.vaddress,
    vemail: req.body.vemail
  };

  // Save Vendor in the database
  Vendor.create(vendor)
    .then(data => {
      // maybe product creation
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vendor."
      });
    });
};

exports.createProduct = (req, res) => {
// exports.createProduct = (vid, product) => {
  return Product.create({
    pname: req.body.pname,
    pcost: req.body.pcost,
    pcategory: req.body.pcategory,
    vid: req.body.vid
  })
  .then((product) => {
    console.log(`Created Product: ${product}`);
    res.send(product);
    // return product;
  })
  .catch((err) => {
    console.log(`Error creating Product: ${err}`);
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Product."
    });
  })
};

// Retrieve all Vendors from the db by name.
exports.findAll = (req, res) => {
  const vname = req.query.vname;
  var condition = vname ? { vname: { [Op.like]: `%${vname}%` } } : null;

  Vendor.findAll({ where: condition })
    .then(vendors => {
      res.send(vendors);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vendors."
      });
    });
};

// Find a single Vendor with an id
exports.findVendorById = (req, res) => {
  const vid = req.params.id;

  // Vendor.findByPk(vid, { include: ["product"] })

  Vendor.findByPk(vid)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Vendor with id=" + vid
      });
    });
};

exports.findProductById = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id, { include: ["vendor"]})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

// Update a Vendor by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Vendor.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vendor was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Vendor with id=${id}. Maybe Vendor was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Vendor with id=" + id
      });
    });
};

// Delete a Vendor with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Vendor.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Vendor was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Vendor with id=${id}. Maybe Vendor was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Vendor with id=" + id
      });
    });
};

// Delete all Vendors from the database.
exports.deleteAll = (req, res) => {
  Vendor.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Vendors were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Vendors."
      });
    });
};

// Find all retail Vendors
exports.findAllRetail = (req, res) => {
  Vendor.findAll({ where: { vtype: 'Retail' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving retail vendors."
      });
    });
};

// Find all personal (single seller) vendors
exports.findAllPersonal = (req, res) => {
  Vendor.findAll({ where: { vtype: 'Personal' } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving personal vendors."
      });
    });
};
