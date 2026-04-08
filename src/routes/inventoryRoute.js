const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getAllInventoryItems);
router.get('/low-stock', inventoryController.getLowStockItems);
router.get('/:id', inventoryController.getInventoryById);
router.get("/category/:category", inventoryController.getInventoryByCategoryID);
router.get("/search", inventoryController.searchInventoryByName);

module.exports = router;