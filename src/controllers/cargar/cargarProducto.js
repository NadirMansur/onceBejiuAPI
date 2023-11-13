const { Producto, Rubro, Proovedor, Tag } = require("../../db");
const cloudinary = require("../../utils/cloudinary");

const cargarProducto = async (req, res, next) => {

  try {
    const {
      prod_name,
      img_1, 
      img_2, 
      img_3, 
      img_4, 
      img_5, 
      description,
      price,
      tags,
      proovedor,
      rubro,
    } = req.body;

    if (req.file === null) {
      return;
    }
    if (prod_name.length === 0 || description.length === 0 || price.length === 0)
      return res.send("prod_name, description y precio son requeriods");

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se cargaron archivos.");
    }

    const file = await cloudinary(req.files.image.tempFilePath);
    console.log(file, "file");
    image = file;

    // Proovedor
    let proovedorBody = await Proovedor.findOne({
      where: { name: proovedor },
    });

    if (!proovedorBody) {
      proovedorBody = await Proovedor.create({ name: proovedor });
    }

    // Rubro
    let rubroBody = await Rubro.findOne({
      where: { name: rubro },
    });

    if (!rubroBody) {
      rubroBody = await Rubro.create({ name: rubro  });
    }

    // Tags
    const tagNames = Array.isArray(tags) ? tags : [tags]; // Convierte en arreglo si no lo es

    const tagsBody = await Promise.all(
      tagNames.map(async (tagName) => {
        let tag = await Tag.findOne({
          where: { name: tagName },
        });

        if (!tag) {
          tag = await Tag.create({ name: tagName });
        }

        return tag;
      })
    );

    // Create Producto
    const newProd = await Producto.create({
      prod_name: prod_name,
      img_1: img_1, 
      img_2: img_2, 
      img_3: img_3, 
      img_4: img_4, 
      img_5: img_5, 
      description:description,
      price: price,
      ProovedorId: proovedorBody.id,
      RubroId: rubroBody.id,
    });

    await newBook.setTags(tagsBody);

    console.log(newProd, "nuevo Producto");

    res.send({
      message: "Book created successfully!",
      prod: newProd,
      boolean: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = cargarProducto;
