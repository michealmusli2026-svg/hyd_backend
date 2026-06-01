const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/add", (req, res, next) => {
  console.log("REGISTER ROUTE HIT");
  next();
}, authController.register);

router.post("/registerUser", (req, res, next) => {
  console.log("REGISTER USER ROUTE HIT");
  next();
}, authController.registerUser);

router.post("/login", (req, res, next) => {
  console.log("LOGIN ROUTE HIT");
  next();
}, authController.login);

// GET ALL USERS
router.get("/users", authController.getUsers);
module.exports = router;