const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  const {
    name,
    mobile,
    whatsapp,
    alternateMobile,
    openingBalance,
    type
  } = req.body;

  try {
    const tableMap = {
      Vendor: "vendors",
      Agent: "agent",
      Party: "parties",
    };

    const tableName = tableMap[type];

    if (!tableName) {
      return res.status(400).json({ message: "Invalid type" });
    }

    const sql = `
      INSERT INTO ${tableName}
      (name, mobile, whatsapp, alternate_mobile, opening_balance)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      name,
      mobile,
      whatsapp,
      alternateMobile,
      openingBalance
    ]);

    return res.json({
      message: `${type} created successfully`,
      id: result.insertId
    });

  } catch (err) {
    return res.status(500).json({
      message: "Database/server error",
      error: err.message
    });
  }
};

// LOGIN (Frontend)
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE name = ?";

    const [results] = await db.query(sql, [username]);

    if (results.length === 0) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.json({
      message: "Login successful",
      token,
      name: user.name,
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const getUser = "SELECT * FROM parties";
    const getVendor = "SELECT * FROM vendors";
    const getAgent = "SELECT * FROM agents";

    const [users] = await db.query(getUser);
    const [vendors] = await db.query(getVendor);
    const [agents] = await db.query(getAgent);

    res.json({
      users,
      vendors,
      agents
    });

  } catch (err) {
    res.status(500).json(err);
  }
};


exports.registerUser = async (req, res) => {
  try {
    const { name, password, mobile } = req.body;

    console.log("Before SELECT query");

    const [users] = await db.query(
      "SELECT * FROM users WHERE name = ?",
      [name]
    );

    console.log("After SELECT query");

    if (users.length > 0) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users 
      (name, password, mobile, deleted)
      VALUES (?, ?, ?, ?)`,
      [name, hashedPassword, mobile, false]
    );

    return res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};