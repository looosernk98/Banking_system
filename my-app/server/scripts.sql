
var sqlcommand = `
create database bank_account

CREATE TABLE customers (
 userid BIGINT(255) NOT NULL PRIMARY KEY,
 first_name VARCHAR(32) NOT NULL,
 last_name VARCHAR(32) NOT NULL,
 email VARCHAR(32) NOT NULL UNIQUE KEY,
 password VARCHAR(255) NOT NULL
)

CREATE TABLE tokens(
  id BIGINT NOT NULL PRIMARY KEY,
  access_token VARCHAR(500) NOT NULL,
  userid BIGINT(255) NOT NULL,
  CONSTRAINT userid_fk
  FOREIGN KEY(userid) REFERENCES customers(userid)
)
`

