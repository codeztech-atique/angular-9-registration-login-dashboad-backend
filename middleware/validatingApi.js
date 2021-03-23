const chalk = require('chalk');

// Validate API
exports.validateAPI = (req, res, next) => {
    // console.log();
    // console.log(chalk.bgYellowBright("---------------- Validated API Data ----------------"));
    // console.log();
    // console.log(req.body);
    // console.log();
    var error = '';
    if(req.body.name === undefined || req.body.name === '') {
        console.log(chalk.red('name is missing'));
        error += "name, "
    } if(req.body.mobile === undefined || req.body.mobile === '') {
      console.log(chalk.red('mobile no is missing'));
      error += "mobile no, "
    }
    if(error!=='') {
        res.status(400).send({
          status: 400,
          message: error + ' is required !!!'
        });
    } else {
      next();
    }
};

exports.fetchSingleDataValidateAPI = (req, res, next) => {
  // console.log();
    // console.log(chalk.bgYellowBright("---------------- Validated API Data ----------------"));
    // console.log();
    // console.log(req.body);
    // console.log();
    var error = '';
    var uniqueId = req.params.id;
    if(uniqueId === undefined || uniqueId === '') {
        console.log(chalk.red('id is missing'));
        error += "id, "
    }
    if(error!=='') {
        res.status(400).send({
          status: 400,
          message: error + ' is required !!!'
        })
    } else {
      next();
    }
}