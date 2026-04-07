const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getAllInventoryItems);
router.get('/low-stock', inventoryController.getLowStockItems);
<<<<<<< HEAD
=======
router.get('/:id', inventoryController.getInventoryById);
router.get("/category/:category", inventoryController.getInventoryByCategoryID);
router.get("/search", inventoryController.searchInventoryByName);

>>>>>>> ce51282ef95d7aafa5d08776bc7c1d0a428cc579

module.exports = router;