const { Producto, Tag, Rubro } = require("../../db");

const getProductos = async (req, res, next) => {
  // console.log("entre al controller allTags");
  try {
    const productos = await Producto.findAll({
      attributes: [
        "id",
        "prod_name",
        "img_1",
        "img_2",
        "img_3",
        "img_4",
        "img_5",
        "description",
        "price",
        "stock",
      ],
      include: [
        {
          model: Tag,
          attributes: ["name"],
        },
        {
          model: Rubro,
          attributes: ["name"],
        },
      ],
    });
    res.send(productos);
  } catch (error) {
    next(error);
  }
};
module.exports = getProductos;
