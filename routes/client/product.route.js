const express = require("express");
const router = express.Router();

const productsController = require("../../controllers/client/products.controller");

router.get("/products", productsController.index);


module.exports = router;