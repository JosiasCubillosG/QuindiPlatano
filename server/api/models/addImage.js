const AddImageScheme = require('../schemes/addImage');
const mongoose = require('mongoose');

module.exports = mongoose.model('AddImages', AddImageScheme);
