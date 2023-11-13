const { Proovedor } = require("../../db");
const cloudinary = require("../../utils/cloudinary");

const cargarPoovedor = async (req, res, next) => {
  try {
    const { name, tel, img_perfil } = req.body;

    if (req.file === null) {
      return;
    }
    if (name.length === 0 || tel.length === 0 || img_perfil.length === 0)
      return res.send("name, tel y img_perfil son requeriods");

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No se cargaron archivos.");
    }

    const file = await cloudinary(req.files.image.tempFilePath);
    console.log(file, "file");
    image = file;

    // Create Proovedor
    const newProovedor = await Proovedor.findOrCreate({
      name: name,
      tel: tel,
      img_perfil: img_perfil,
    });

    console.log(newProovedor, "nuevo Producto");

    res.send({
      message: "newProovedor created successfully!",
      proovedor: newProovedor,
      boolean: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = cargarPoovedor;
