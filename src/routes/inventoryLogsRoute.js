const express = require("express");
const router = express.Router();
const inventoryLogsController = require("../controllers/inventoryLogsController");

router.get("/", inventoryLogsController.getAllInventoryLogs);

module.exports = router;