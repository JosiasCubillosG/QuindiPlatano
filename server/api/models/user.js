const UserScheme = require('../schemes/user');
const mongoose = require('mongoose');

module.exports = mongoose.model('Users', UserScheme);
