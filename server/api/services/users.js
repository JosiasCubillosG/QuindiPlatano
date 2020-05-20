const mongoose = require('mongoose');
const User = mongoose.model('Users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UsersService = {
    async getUsers(req, res) {
        const tags = req.query && req.query.tags;
        const query = tags && { tags: { $in: tags } };

        try{
            const users = await User.find(query);
            res.send({ users, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async getUser(req, res) {
        const userId = req.params.userId;

        try{
            const user = await User.findOne({ _id: userId });   
            res.send({ user, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async createUser(req, res) {
        const { body: userData } = req;
        try{
            const user = new User(userData);
            await user.save();
            res.send({ user, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async updateUser(req, res) {
        const { body: userData } = req;
        try{
            const user = await User.findById(req.params.userId);

            if (!user) return res.send({
                message: 'The user does not exist',
                status: 'error'
            });

            await User.updateOne({ _id: user._id }, userData);
            res.send({ user, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async deleteUser(req, res) {
        const userId = req.params.userId;
        try{
            const user = await User.findById(userId);

            if (!user) return res.send({
                message: 'The user does not exist',
                status: 'error'
            });

            await user.deleteOne();
            res.send({ user, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async signUp(req, res) {

        try{
            const user = new User(req.body);
    
            await user.save();
            const token = jwt.sign({ id: user._id }, 'secret-key', { expiresIn: 86400 });
            user.password = undefined;
            res.send({ token: token, user: user, status: 'success' });       
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }  
    },
    async login(req, res) {

        try{
            const user = await User.findOne({ email: req.body.email });
            if (!user) 
                return res.send({ message: 'No user found.', status: 'error' });
        
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid)
                return res.send({ token: null, message: 'Wrong email or password.', status: 'error' });
    
            const token = jwt.sign({ id: user._id }, 'secret-key', { expiresIn: 86400 });
    
            user.password = undefined;
    
            res.send({ token: token, user: user, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        } 
    }
}

module.exports = UsersService;
