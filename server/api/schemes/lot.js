const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LotScheme = new Schema({
	createdDate: {
		default: Date.now,
		type: Date
	},
	name: {
		required: 'Please add the name.',
		type: String
	},
	plants: {
		required: 'Please add the number Plants',
		type: Number
	},
	cropId: {
		type: String
	},
	tasks: {
		type: [{
			name: {
				required: 'Please add the name.',
				type: String
			},
			days:{
				required: 'Please add the number days',
				type: Number
			},
			state: {	
				type: Boolean
			}
		}],
	}
});

module.exports = LotScheme;