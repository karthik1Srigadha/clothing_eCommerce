const router = require("express").Router();
const { createOrder, getOrderById } = require("../controllers/orderController");
const { protect } = require("../middleware/auth");

router.post("/", protect, createOrder);
router.get("/:id", protect, getOrderById);

module.exports = router;
