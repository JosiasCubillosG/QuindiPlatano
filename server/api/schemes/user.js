const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const userRoles = require('../config/constants/userRoles');

const UserSchema = new Schema({
	createdDate: {
		default: Date.now,
		type: Date
	},
	name: {
		required: 'Please add the name.',
		type: String
    },
    email:{
        required: 'please add the email',
        type: String,
        unique: true
    },
    password:{
        required: 'please add the password',
        type: String
    },
    stripeUserId: {
	    type: String
    },
    gitLabToken: {
	    type: String
    },
    role: {
        default: 'platanicultor',
        enum: Object.values(userRoles),
        required: 'the user needs a role',
        type: String
    }
});

UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});

module.exports = UserSchema;