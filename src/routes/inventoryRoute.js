const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getAllInventoryItems);
router.get('/low-stock', inventoryController.getLowStockItems);

module.exports = router;