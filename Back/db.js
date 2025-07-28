const mysql = require("mysql2");
require("dotenv").config();

// conexión
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT || 3306,
});

//conect
db.connect((err) => {
  if (err) {
    console.error("Error al conectar:", err.message);
  } else {
    console.log("Conexión exitosa MySQL");
  }
});

module.exports = db;
