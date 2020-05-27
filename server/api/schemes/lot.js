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
	tasks:{
		type:[
			{
				name: String,
				state: Boolean,
				days: Number,
				imageURL: String
			}
		],
		default: [
			{
				name: 'Abonar',
				state: false,
				days: 1,
				imageURL:'https://quindiplatanos.s3.amazonaws.com/5ecc44195f149778c027a858-abonar.jpg'
			},
			{
				name: 'Fumigar',
				state: false,
				days: 2,
				imageURL:'https://quindiplatanos.s3.us-east-2.amazonaws.com/5ecc44435f149778c027a859-fumigar.jpg'
			}
		]
	}
});

module.exports = LotScheme;