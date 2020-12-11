module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    pname: {
      type: DataTypes.STRING
    },
    pcost: {
      type: DataTypes.STRING
    },
    pcategory: {
      type: DataTypes.STRING
    }
  });

  return Product;
};