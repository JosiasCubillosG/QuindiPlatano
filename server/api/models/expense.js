const ExpenseScheme = require('../schemes/expense');
const mongoose = require('mongoose');

module.exports = mongoose.model('Expenses', ExpenseScheme);