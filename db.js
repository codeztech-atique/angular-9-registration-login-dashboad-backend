const mongoose = require('mongoose');
const config = require('config');
const chalk = require('chalk');

// Mongodb ServerUrl
const connectUrl = config.serverMongodb.url+''+config.serverMongodb.username+':'+config.serverMongodb.password+'@'+config.serverMongodb.serverUrl+'/'+config.serverMongodb.databaseName+'?retryWrites=true&w=majority';
// console.log(connectUrl);

// Mongodb LocalUrl
// const connectUrl = config.localMongodb.url+''+config.localMongodb.serverUrl+':'+config.localMongodb.port+'/'+config.localMongodb.databaseName;

mongoose.connect(connectUrl,{ useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false },(err) => {
    if(!err){
        console.log(chalk.green('MongoDB connected...'));
    } else
    {
        console.log(chalk.red('Error in DB connection: ' + JSON.stringify(err, undefined, 2)));
    }
})

module.exports = mongoose
