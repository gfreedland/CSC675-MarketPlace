module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    cname: {
      type: Sequelize.STRING
    },
    cpassword: {
      type: Sequelize.STRING
    },
    caddress: {
      type: Sequelize.STRING
    },
    cemail: {
      type: Sequelize.STRING
    },
    
  }, {
    freezeTableName: true,
  });

  return Customer;
};