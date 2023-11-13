const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      total_order: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      purchase_status: {
        type: DataTypes.ENUM("Pendiente", "Completedo","Exceptuado"),
        allowNull: false,
        defaultValue: "Pending",
      },
    },
    {paranoid: true }
  );
};
