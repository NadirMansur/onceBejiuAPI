const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Proovedor",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      img_perfil: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { paranoid: true }
  );
};
