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
				days: 7,
				imageURL:'https://quindiplatanos.s3.amazonaws.com/5ecc44195f149778c027a858-abonar.jpg'
			},
			{
				name: 'Fumigar',
				state: false,
				days: 15,
				imageURL:'https://quindiplatanos.s3.us-east-2.amazonaws.com/5ecc44435f149778c027a859-fumigar.jpg'
			},
			{
				name: 'Desmanche',
				state: false,
				days: 3,
				imageURL:'https://quindiplatanos.s3.amazonaws.com/5edd3d72751c4e374c4df516-desmanche.png'
			},
			{
				name: 'Deshoje',
				state: false,
				days: 4,
				imageURL:'https://quindiplatanos.s3.us-east-2.amazonaws.com/5edd3f87751c4e374c4df51b-deshoje.png'
			},
			{
				name: 'Descalcetamiento',
				state: false,
				days: 5,
				imageURL:'https://quindiplatanos.s3.us-east-2.amazonaws.com/5edd3fa2751c4e374c4df51c-descalcetamiento.png'
			},
			{
				name: 'Amarre',
				state: false,
				days: 6,
				imageURL:'https://quindiplatanos.s3.us-east-2.amazonaws.com/5edd3fc3751c4e374c4df51d-amarre.png'
			},
			{
				name: 'Fertilizacion',
				state: false,
				days: 7,
				imageURL:'https://quindiplatanos.s3.us-east-2.amazonaws.com/5edd3fdf751c4e374c4df51e-fertilizacion.png'
			},
			{
				name: 'Embolse',
				state: false,
				days: 8,
				imageURL:'https://quindiplatanos.s3.us-east-2.amazonaws.com/5edd4000751c4e374c4df51f-embolse.png'
			}
			
		]
	}
});

module.exports = LotScheme;