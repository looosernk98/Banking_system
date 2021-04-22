const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../db/connect');
const {
  validateUser,
  isInvalidField,
  generateAuthToken
} = require('../utils/common');
const authMiddleware = require('../middleware/auth');

const Router = express.Router();

Router.post('/signup', async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    // console.log(req.body);
    const validFieldsToUpdate = [
      'first_name',
      'last_name',
      'email',
      'password'
    ];
    const receivedFields = Object.keys(req.body);

    const isInvalidFieldProvided = isInvalidField(
      receivedFields,
      validFieldsToUpdate
    );
   
    console.log(isInvalidFieldProvided);
    if (isInvalidFieldProvided) {
      return res.status(400).send({
        signup_error: 'Invalid field.'
      });
    }

    

    
    const result =await pool.query(`SELECT * FROM customers WHERE email = ${email}`,function(err,res){
       if(err) console.log(err);
        return res;
    });
    
     const count = 0;
    if (count > 0) {
      return res.status(400).send({
        signup_error: 'User with this email address already exists.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    await pool.query(
        `INSERT INTO customers (first_name, last_name, email, password) VALUES ("${first_name}", "${last_name}", "${email}", "${hashedPassword}")`
       , function(err,res){
           console.log("yesssss",res)
       }
    );
    res.status(201).send("success");
  } catch (error) {
    res.status(400).send({
      signup_error: 'Error while signing up..Try again later.'
    });
    console.log(error);
  }
});

Router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await validateUser(email, password);
    console.log(user,">>>>>>>>>>>");
    
    if (!user) {
      res.status(400).send({
        sigin_error: 'Email/password does not match.'
      });
    }
    const token = await generateAuthToken(user);
    const result = await pool.query(
      `insert into tokens(access_token, userid) values("${token}","${user.userid}")`,function(err,res){
          if(err) throw err;
          return res;
      }
    );
    if (!result.rows[0]) {
      return res.status(400).send({
        signin_error: 'Error while signing in..Try again later.'
      });
    }
    user.token = result.rows[0].access_token;
    res.send(user);
  } catch (error) {
      res.status(400).send({
          signin_error: 'Email/password does not match.'
        });
        
    }
    // console.log(error);
});

Router.post('/logout', authMiddleware,  async (req, res) => {
  try {
    const { userid, access_token } = req.user;
    await pool.query(`delete from tokens where userid="${userid}" and access_token="${access_token}"`);
    res.send();
  } catch (error) {
    res.status(400).send({
      logout_error: 'Error while logging out...Try again later.'
    });
    console.log(error);
  }
});

module.exports = Router;