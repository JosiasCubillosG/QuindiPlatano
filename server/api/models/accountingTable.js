const AccountingScheme = require('../schemes/accountingTable');
const mongoose = require('mongoose');

module.exports = mongoose.model('AccountingTables', AccountingScheme);
