const IncomeScheme = require('../schemes/income');
const mongoose = require('mongoose');

module.exports = mongoose.model('Incomes', IncomeScheme);