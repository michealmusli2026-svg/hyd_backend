
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api", orderRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req,res)=>{
  res.send("Trade Backend Running");
})

app.listen(5001, () => {
  console.log("Server running on port 5001");
});



