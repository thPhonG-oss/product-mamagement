const express = require("express");
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });


const productController = require("../../controllers/admin/product.controller");

router.get("/", productController.product);
router.patch("/change-status/:status/:id", productController.changeStatus);
router.patch("/change-multi", productController.changeMulti);
router.delete("/delete/:id", productController.deleteItem);
router.get("/create", productController.createItem);

module.exports = router;

// thêm ":" trước path để tạo router động