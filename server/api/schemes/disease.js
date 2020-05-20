const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {config} = require('../config/index')

const DiseaseScheme = new Schema({
	createdDate: {
		default: Date.now,
		type: Date
	},
	name: {
		required: 'Please add the name.',
		type: String
    },
    symptomatology: {
        required: 'Please add the symptomatology',
        type: String
    },
    treatment: {
        required: 'Please add the treatment',
        type: String
    },
    imageURL: {
        required: 'Please add a image',
        type: String
    }

});

module.exports = DiseaseScheme;