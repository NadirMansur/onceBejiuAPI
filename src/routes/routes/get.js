const express = require("express");
const router = express.Router();
const getProductos = require("../../controllers/get/getProductos"); 
const getRubros = require("../../controllers/get/getRubros");
const getProovedores = require("../../controllers/get/getProveedores")
const getTags = require("../../controllers/get/getTags");


/* GET books listing. */

router.get("/productos", getProductos);
router.get("/proovedores", getProovedores);
router.get("/rubros", getRubros);
router.get("/tags", getTags);

// router.get("/book/:id", findById);
// router.get("/filter", filterBooks);
// router.get("/authors", allAuthors);
// router.put("/update/:id", upDateBook);
// router.delete("/delete/:id", deleteBook);
// router.put("/restore/:id", restoreBook);
// router.post("/", createBook);
//router.get("/ratings",getAllRatingBook)

module.exports = router;
