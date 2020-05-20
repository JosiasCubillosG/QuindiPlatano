const cropScheme = require('../schemes/crop');
const mongoose = require('mongoose');

module.exports = mongoose.model('Crops', cropScheme);
