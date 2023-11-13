const express = require("express");
const router = express.Router();
const cargarProducto = require("../../controllers/cargar/cargarProducto"); //se hizo cambio por B mayuscula el archivo allBooks.js
const cargarProovedor = require("../../controllers/cargar/cargarProovedor");
const cargarRubro = require("../../controllers/cargar/cargarRubro");
const cargarTag = require("../../controllers/cargar/cargarTag");

// const filterBooks = require("../controllers/filterBooks");
// const findById = require("../controllers/findById");
// const allAuthors = require("../controllers/allAuthors");
// const upDateBook = require("../controllers/upDateBook");
// const { deleteBook, getDeletedBooks } = require("../controllers/deleteBook");
// const restoreBook = require("../controllers/restoreBook");
// const createBook = require("../controllers/createBook");
//const getAllRatingBook = require('../controllers/ratingBook');

/* GET books listing. */

router.post("/producto", cargarProducto);
router.post("/proovedor", cargarProovedor);
router.post("/rubro", cargarRubro);
router.post("/tag", cargarTag);

// router.get("/book/:id", findById);
// router.get("/filter", filterBooks);
// router.get("/authors", allAuthors);
// router.put("/update/:id", upDateBook);
// router.delete("/delete/:id", deleteBook);
// router.put("/restore/:id", restoreBook);
// router.post("/", createBook);
//router.get("/ratings",getAllRatingBook)

module.exports = router;
