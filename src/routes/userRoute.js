const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUserInfo);
router.put("/:id/password", userController.updateUserPassword);

module.exports = router;