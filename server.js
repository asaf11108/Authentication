const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var csp = require('helmet-csp');

const app = express();
const saltRounds = 10;
const tokenKey = "shhhhh";

const mysql      = require('mysql');
const mySqlConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'express-cc'
});

app.use(csp({
  // Specify directives as normal.
  directives: {
    defaultSrc: ["'self'", 'default.com'],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ['style.com'],
    fontSrc: ["'self'", 'fonts.com'],
    imgSrc: ['img.com', 'data:'],
    sandbox: ['allow-forms', 'allow-scripts'],
    reportUri: '/report-violation',
    objectSrc: ["'none'"],
    upgradeInsecureRequests: true,
    workerSrc: false  // This is not set.
  },
 
  // This module will detect common mistakes in your directives and throw errors
  // if it finds any. To disable this, enable "loose mode".
  loose: false,
 
  // Set to true if you only want browsers to report errors, not block them.
  // You may also set this to a function(req, res) in order to decide dynamically
  // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
  reportOnly: false,
 
  // Set to true if you want to blindly set all headers: Content-Security-Policy,
  // X-WebKit-CSP, and X-Content-Security-Policy.
  setAllHeaders: false,
 
  // Set to true if you want to disable CSP on Android where it can be buggy.
  disableAndroid: false,
 
  // Set to false if you want to completely disable any user-agent sniffing.
  // This may make the headers less compatible but it will be much faster.
  // This defaults to `true`.
  browserSniff: true
}))

app.get('/api/customers', verifyToken, (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad1', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];
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

const port = 5000;

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
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