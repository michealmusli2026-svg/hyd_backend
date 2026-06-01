// const mysql = require("mysql2");

// // const db = mysql.createPool({
// //   host: "localhost",
// //   user: "rishabh",
// //   password: "Rishabh18",
// //   database: "trade_system",
// // });
// const db = mysql.createPool({
//   host: "localhost",
//   user: "imran",
//   password: "786imran",
//   database: "hyd_masters",
// });

// // module.exports = db;
// // // DATABASE_NAME="tradeMaster"
// // // DATABASE_USER="imran"
// // // DATABASE_PASSWORD="786imran"
// // // DATABASE_HOST="localhost"
// // const { Sequelize, DataTypes } = require("sequelize");

// // const sequelize = new Sequelize("hyd_master", "imran", "786imran", {
// //   host: "localhost",
// //   dialect: "mysql",
// // });

// // const User = sequelize.define("User", {
// //   name: DataTypes.STRING,
// //   email: DataTypes.STRING,
// // });

// // (async () => {
// //   await sequelize.sync({ alter: true , force:true});
// // })();

const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "imran",
  password: "786imran",
  database: "hyd_masters",
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("Database connection failed:", err.message);
  } else {
    console.log("MySQL Connected Successfully");
    connection.release();
  }
});

module.exports = db.promise();