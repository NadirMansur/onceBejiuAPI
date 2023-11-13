const { Proveedor, Producto } = require("../../db");

const getProveedores = async (req, res, next) => {
  try {
    var data = await Proveedor.findAll({
      attributes: ["name", "tel", "id", "img_perfil"],
      include: [
        {
          model: Producto,
        },
      ],
    });
    res.send(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getProveedores;
