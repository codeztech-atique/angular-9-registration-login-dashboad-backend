const mongoose = require('mongoose');

var ttcontent = new mongoose.Schema({
    id: {type: String},
    name: { type: String},
    mobile: { type: String},
    createdAt: { type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

var ttcontent = mongoose.model('ttcontent', ttcontent);
module.exports = ttcontent;
