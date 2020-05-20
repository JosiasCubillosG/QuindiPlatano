const DiseaseScheme = require('../schemes/disease');
const mongoose = require('mongoose');

module.exports = mongoose.model('Diseases', DiseaseScheme);
