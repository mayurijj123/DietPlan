const mysql = require('mysql')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "Apeksha",
database:"dietplan" 
})

module.exports = db;