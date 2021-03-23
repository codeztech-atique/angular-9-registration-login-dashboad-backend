const mongoose = require('mongoose');

var user = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  email: {type: String, default: ''},
  password: {type: String, default: ''},
  acceptTerms: {type: Boolean, default: true},
  createdAt: { type: Date, default: Date.now},
  updatedDate: {type: Date, default: Date.now},
});

var userdetail = mongoose.model('user', user);
module.exports = userdetail;
