module.exports = (sequelize, Sequelize) => {
  const Vendor = sequelize.define("vendor", {
    vname: {
      type: Sequelize.STRING
    },
    vtype: {
      type: Sequelize.STRING
    },
    vaddress: {
      type: Sequelize.STRING
    },
    vemail: {
      type: Sequelize.STRING
    },
  }, {
    freezeTableName: true,
  });

  return Vendor;
};