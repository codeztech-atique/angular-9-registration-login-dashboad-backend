const config = require('config');
const chalk = require("chalk");
const fs = require("fs");
const app = require('./index');
const port = process.env.PORT || config.port;

// Server
app.listen(port, () => {
  console.log(chalk.blueBright("Server is listening port number:", port));
});

