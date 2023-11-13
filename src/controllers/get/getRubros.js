const {Rubro} = require("../../db")

const getRubros = async (req, res, next) => {
	try {
		var data = await Rubro.findAll({
            attributes: ["name"],
        });
		res.send(data);
	} catch (error) {
		next(error);
	}
};

module.exports = getRubros