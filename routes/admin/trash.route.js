const express = require("express");
const router = express.Router();
const trashController = require("../../controllers/admin/trash.controller");

router.get("/", trashController.trash);
router.patch("/restore/:id", trashController.restore);
module.exports = router;