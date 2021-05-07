const mysql = require('mysql');

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345NR",
  multipleStatements: true, // this allow you to run multiple queries at once.
});

var sqlCommand = `
create database test;

use test;

CREATE TABLE users (
  id int(11) NOT NULL auto_increment,
  name varchar(100) NOT NULL,
  age int(3) NOT NULL,
  email varchar(100) NOT NULL,
  PRIMARY KEY (id)
);
`
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected yet no db is selected yet!");
  con.query(sqlCommand, function (err, result) {
    if (err) throw err;
    console.log("Database created");
  })
});

module.exports={con};