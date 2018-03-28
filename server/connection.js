const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "araliya"
});

connection.connect((err) => {
  if(err){
    return console.log(err.message);
  }
  console.log("Connected to mysql server");
});

module.exports = {connection};
