const { Rubro } = require("../../db");

const cargarRubro = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (name.length === 0) return res.send("Rubro name es requerido");

    // Tags
    const rubro = await Rubro.findOrCreate({ name: name });

    res.send({
      message: "rubro created successfully!",
      rubro: rubro,
      boolean: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = cargarRubro;
