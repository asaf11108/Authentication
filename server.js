const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check');

const app = express();
const saltRounds = 10;
const tokenKey = "shhhhh";

var customers = [
  {id: 1, firstName: 'John', lastName: 'Doe'},
  {id: 2, firstName: 'Brad1', lastName: 'Traversy'},
  {id: 3, firstName: 'Mary', lastName: 'Swanson'},
];

const mysql      = require('mysql');
const mySqlConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'express-cc'
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader("Content-Security-Policy", "script-src 'self'; style-src 'self");
  return next();
});

app.get('/api/customers', verifyToken, (req, res) => {
  jwt.verify(req.token, tokenKey, {expiresIn: '30s'}, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else if(authData.user.username != 'asaf'){
      res.sendStatus(400);
    } else {
      res.json(customers);
    }
  });
});

app.post('/api/acount/login', (req, res) => {
   // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [username, password] = new Buffer(b64auth, 'base64').toString().split(':');
  
  mySqlConnection.query(`SELECT * FROM users WHERE username = '${username}';`, function (error, results, fields) {
    if (error) throw error;
    const user = results[0];

    bcrypt.compare(password, user.password, function(err, ans) {
      // res == true
      if(ans){
        delete user.password;
        const token = jwt.sign({user}, tokenKey);
        res.json({token});
      }
      else
        res.status(400);
    });
  });
});


app.post('/api/customers', verifyToken, (req, res) => {
  // var fName = req.body.customer;
  // console.log(fName);
  jwt.verify(req.token, tokenKey, {expiresIn: '30s'}, (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else if(authData.user.username != 'asaf'){
      res.sendStatus(400);
    } else {
      const customerObj = {id: customers.length+1, ...req.body.customer};
      customers.push(customerObj);
      res.sendStatus(200);
    }
  });
});

const port = 5000;

const server = app.listen(port, () => {
  `Server running on port ${port}`;
  mySqlConnection.connect();
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
  mySqlConnection.end();

  server.close(() => {
      process.exit(0);
  });

  setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
  }, 10000);
}

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(403);
    }
}