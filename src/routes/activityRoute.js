const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activityController");

router.get("/:userId", activityController.getActivityByUserId);
router.post("/", activityController.logActivity);

module.exports = router;