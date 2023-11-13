const { Tag } = require("../../db");

const cargarTag = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (name.length === 0) return res.send("Tag name es requerido");

    // Tags
    const tag = await Tag.findOrCreate({ name: name });

    res.send({
      message: "Tag created successfully!",
      tag: tag,
      boolean: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = cargarTag;
