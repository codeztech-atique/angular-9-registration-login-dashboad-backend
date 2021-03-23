const mongoose = require('mongoose');
const cryptoRandomString = require('crypto-random-string');
const chalk = require('chalk');

require('../models/todo');
const ttContent = mongoose.model('ttcontent');

exports.todoSaveList = (req, res, next) => {
  // console.log(chalk.bgYellowBright("---------------- UrlShorter Information Submitted ----------------"));
  // console.log(req.body);
  // var totalCombination = req.body.url+"/"+req.body.description;
  var resD = cryptoRandomString({length: 10, type: 'base64'}); //characters: totalCombination
  req.body.id = resD;
  var todoSave = new ttContent(req.body);
  todoSave.save().then(resp => {
    res.status(201).send({
      message: 'Success',
      data: {
        "id": resD,
      }
    })
  }).catch(err => {
    res.status(400).send({
      message: 'Error',
      error: 'Empty Store'
    });
  });
};

exports.getAllInformation = (req, res, next) => {
  // console.log(chalk.bgYellowBright("---------------- Get All Submitted Information ----------------"));
  // console.log(req.body);
  ttContent.find({}, async( err, resp) => {
    if (Object.keys(resp).length) {
      var filterObj = [];
      resp.forEach((e) => {
        filterObj.push({
          id: e.id,
          name: e.name,
          mobile: e.mobile,
        });
      });
      res.status(200).send({
        message: 'Success',
        data: filterObj
      });
    } else if(err) {
      res.status(400).send({
        message: 'Err !!!',
        result: err
      });
    } else {
      res.status(400).send({
        message: "Error",
        error: "Empty Store"
      });
    }
  });
};

exports.fetchOne = (req, res, next) => {
  // console.log(chalk.bgYellowBright("---------------- UrlShorter Information Submitted ----------------"));
  ttContent.find({id: req.params.id}, async( err, resp) => {
    if (Object.keys(resp).length) {
      var filterObj = [];
      resp.forEach((e) => {
        filterObj.push({
          id: e.id,
          name: e.name,
          mobile: e.mobile,
        });
      });
      res.status(200).send({
        message: 'Success',
        data: filterObj
      });
    } else if(err) {
      res.status(400).send({
        message: 'Err !!!',
        result: err
      });
    } else {
      res.status(404).send({
        message: "Error",
        error: "Empty Store"
      });
    }
  });
};

exports.deleteOne = (req, res, next) => {
  // console.log(chalk.bgYellowBright("---------------- UrlShorter Information Submitted ----------------"));
  ttContent.deleteOne({id: req.params.id}, async( err, resp) => {
    if (Object.keys(resp).length) {
      if(resp.deletedCount === 1) {
        res.status(200).send({
          message: 'Successfully Deleted !!!',
          id: req.params.id
        });
      } else if(resp.deletedCount ===  0) {
        res.status(404).send({
          message: 'No data found with the respective id !!!',
        });
      }
    } else if(err) {
      res.status(400).send({
        message: 'Err !!!',
        result: err
      });
    } else {
      res.status(400).send({
        message: "Error",
        error: "Empty Store"
      });
    }
  });
};

exports.updateOne = (req, res, next) => {
  // console.log(chalk.bgYellowBright("---------------- UrlShorter Information Submitted ----------------"));
  ttContent.findOneAndUpdate({id: req.body.id}, {$set:{ name:req.body.name, mobile:req.body.mobile}}, {new: true}, async( err, resp) => {
    if (Object.keys(resp).length) {
      res.status(200).send({
        message: 'Successfully Updated !!!',
        id: req.body.id
      });
    } else if(err) {
      res.status(400).send({
        message: 'Err !!!',
        result: err
      });
    } else {
      res.status(404).send({
        message: "Error",
        error: "Empty Store"
      });
    }
  });
};