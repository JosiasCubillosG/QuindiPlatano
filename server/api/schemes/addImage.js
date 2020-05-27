const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {config} = require('../config/index')

const AddImageScheme = new Schema({
    createdDate:{
        default: Date.now,
        type: Date
    },
    name: {
        required: 'Please add a name',
        type: String
    },
    imageURL: {
        required: 'Please add a image',
        type: String
    }

});

module.exports = AddImageScheme;