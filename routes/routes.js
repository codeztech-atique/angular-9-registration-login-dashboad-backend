const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());

app.use(cors());

// Authentication of user
const authentication = require('../authentication/auth');

// Middleware
const middleware = require('../middleware/validatingApi');

// Controller
const userControllers = require('../controllers/userInformation');
const ppControllers = require('../controllers/ppCtrl');

// Sample API testing
app.get('/', (req, res) => {
  res.send({
     status:200,
     message:'App is working fine!'
  });
});

app.post('/users/register', (req, res, next) => {
  userControllers.userRegister(req, res);
});

app.post('/users/authenticate', (req, res, next) => {
  userControllers.userLogin(req, res);
});

app.get('/users', (req, res, next) => {
  userControllers.getAllUsers(req, res);
});

app.get('/users/:id', (req, res, next) => {
  userControllers.getSingleUsers(req, res);
});

app.put('/users/:id', (req, res, next) => {
  userControllers.updateSingleUsers(req, res);
});

app.delete('/users/:id', (req, res, next) => {
  userControllers.deleteSingleUsers(req, res);
});

// get all url shorten
app.get('/todo/get-all', [authentication.authUser], (req, res, next) => {
  ppControllers.getAllInformation(req, res);
});

// Create todos
app.post('/todo/create', [authentication.authUser, middleware.validateAPI], (req, res, next) => {
  ppControllers.todoSaveList(req, res);
});

// Delete Single todos
app.delete('/:id', [authentication.authUser, middleware.fetchSingleDataValidateAPI], (req, res, next) => {
  ppControllers.deleteOne(req, res);
});

// Fetch Single todos
app.get('/:id', [authentication.authUser, middleware.fetchSingleDataValidateAPI], (req, res, next) => {
  ppControllers.fetchOne(req, res);
});

// Fetch Single todos
app.put('/todo/update', authentication.authUser, (req, res, next) => {
  ppControllers.updateOne(req, res);
});

module.exports = app;