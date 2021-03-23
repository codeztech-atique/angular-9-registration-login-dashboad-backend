const mongoose = require('mongoose');
require('../models/userschema');

const Userdetail = mongoose.model('user');

const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const config = require('config');



exports.userRegister = (req, res, next) => {
  console.log(chalk.bgYellowBright("---------------- Submit Information ----------------"));
  console.log(req.body);
  
  Userdetail.findOne({'email': req.body.email}, async( err, userInfo) => {
    if (userInfo!==null) {
      res.status(400).send(
        {
          'message': 'User Exists in our database!',
        });
    } else {
      var userdetails = new Userdetail(req.body);
      userdetails.save()
        .then(user => {
          console.log(chalk.bgYellowBright('User Registered!'))   
          res.status(200).send(
            {
                'message': 'Added Successfully',
                'data': user
            });
        })
        .catch(err => {
          res.status(400).send('Failed to create new record');
      });
    }
  });
};

exports.userLogin = (req, res, next) => {
  console.log(chalk.bgYellowBright("---------------- User Login ----------------"));
  console.log(req.body);

  var query = { email : req.body.email, password: req.body.password };
  console.log(query);

  Userdetail.find(query, (err, result) => {
    console.log(result);
    console.log(result.length);
    if (result.length === "0") {
      console.log('Invalid User');
      //res.json('Invalid user name and password');
      return res.status(401).send('Invalid User and/or Password.');
    }
    else  {
        var userResult = JSON.stringify(result);
        userResult = userResult.replace(/(^\[)/, '');
        userResult =  userResult.replace(/(\]$)/, '');
        try {
           var userdata = JSON.parse(userResult);
        } catch(e) {
            return res.status(401).send('Invalid User and/or Password.');
        }
        var tokenExpiresTime = Math.floor(Date.now() / config.tokenExpires) + (60 * 60); //valid for 2 hr
        jwt.sign({email: req.body.email}, config.secret, {expiresIn: tokenExpiresTime}, (err, utoken) => {
            return res.json({
                email: req.body.email,
                name : userdata['name'],
                userbio : userdata['userbio'],
                headline : userdata['headline'],
                profileurl : userdata['profileurl'],
                token: utoken
            });
        });
      }
  });
};

exports.getAllUsers = (req, res, next) => {
    console.log(chalk.bgYellowBright("---------------- Get Information ----------------"));
    console.log(req.body);
    var query = {};
    Userdetail.find(query, (err,product)=> {
    if (err)
      console.log(err)
    else
      res.status(200).send({
          message: 'Succesfully fetch Record!',
          data: product
      });
    });
}

exports.getSingleUsers = (req, res, next) => {
  console.log(chalk.bgYellowBright("---------------- Get Single User Information ----------------"));
  var query = {'_id': req.params.id};
  console.log(query)
  Userdetail.find(query, (err,product)=> {
  if (err)
    console.log(err)
  else
    res.status(200).send({
        message: 'Succesfully fetch Record!',
        data: product[0]
    });
  });
}

exports.updateSingleUsers = (req, res, next) => {
  console.log(chalk.bgYellowBright("---------------- Update Single User Information ----------------"));
  var query = {'_id': req.params.id}, updateQuery;
  console.log(req.body.password)
  if(req.body.password === '') {
    updateQuery = {"$set":{"firstName": req.body.firstName, "lastName": req.body.lastName, "updatedDate": new Date()}}
  } else {
    updateQuery = {"$set":{"firstName": req.body.firstName, "lastName": req.body.lastName, "password": req.body.password, "updatedDate": new Date()}}
  }
  console.log(query)
  Userdetail.updateOne(query, updateQuery, {"multi": true}, (err,product)=> {
  if (err)
    console.log(err)
  else
    res.status(200).send({
        message: 'Succesfully fetch Record!',
        data: product[0]
    });
  });
}

exports.deleteSingleUsers = (req, res, next) => {
  console.log(chalk.bgYellowBright("---------------- Delete Single User Information ----------------"));
  var query = {'_id': req.params.id};
  console.log(query)
  Userdetail.findByIdAndRemove(query, (err,product)=> {
  if (err)
    console.log(err)
  else
    res.status(200).send({
        message: 'Succesfully fetch Record!',
        data: product[0]
    });
  });
}