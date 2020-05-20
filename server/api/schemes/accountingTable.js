const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountingScheme = new Schema({
	createdDate: {
		default: Date.now,
		type: Date
    },
	name: {
		required: 'Please add the name.',
		type: String
    },
    userId:{
        type:String
    }
});

module.exports = AccountingScheme;