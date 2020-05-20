const LotScheme = require('../schemes/lot');
const mongoose = require('mongoose');

module.exports = mongoose.model('Lots', LotScheme);
