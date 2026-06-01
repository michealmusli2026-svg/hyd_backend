
const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const verifyToken = require("../middleware/authMiddleware");

// router.post("/orders",verifyToken,orderController.createOrder);
router.post("/orders",orderController.createOrder);
router.get("/orders",orderController.getOrders);

module.exports = router;
