const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());

// Authentication of user
const authentication = require('../authentication/auth');

// Middleware
// const middleware = require('../middleware/validatingApi');

// Controller
const controllers = require('../controllers/userInformation');

// Sample API testing
app.get('/', (req, res) => {
  res.send({
     status:200,
     message:'App is working fine!'
  });
});

app.post('/users/register', (req, res, next) => {
  controllers.userRegister(req, res);
});

app.post('/users/authenticate', (req, res, next) => {
  controllers.userLogin(req, res);
});

app.get('/users', (req, res, next) => {
  controllers.getAllUsers(req, res);
});

app.get('/users/:id', (req, res, next) => {
  controllers.getSingleUsers(req, res);
});

app.put('/users/:id', (req, res, next) => {
  controllers.updateSingleUsers(req, res);
});

app.delete('/users/:id', (req, res, next) => {
  controllers.deleteSingleUsers(req, res);
});

module.exports = app;