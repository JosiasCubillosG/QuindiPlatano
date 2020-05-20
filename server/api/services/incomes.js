const mongoose = require('mongoose');
const Income = mongoose.model('Incomes');

const IncomeService = {

    async getIncomes(req, res) {
        console.log('Hey!!!')
        const tags = req.query && req.query.tags;
        const query = tags && { tags: { $in: tags } };

        try{
            const income = await Income.find(query);
            res.send({ income, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async getIncome(req, res) {
        const incomeId = req.params.incomeId;

        try{
            const income = await Income.findOne({ _id: incomeId });   
            res.send({ income, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async createIncome(req, res) {
        const { body: incomeData } = req;
        try{
            const income = new Income(incomeData);
            await income.save();
            res.send({ income, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async updateIncome(req, res) {
        const { body: incomeData } = req;
        try{
            const income = await Income.findById(req.params.incomeId);

            if (!income) return res.send({
                message: 'The income does not exist',
                status: 'error'
            });

            await Income.updateOne({ _id: income._id }, incomeData);
            res.send({ income, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    },
    async deleteIncome(req, res) {
        const incomeId = req.params.incomeId;
        try{
            const income = await Income.findById(incomeId);

            if (!income) return res.send({
                message: 'The income does not exist',
                status: 'error'
            });

            await income.deleteOne();
            res.send({ income, status: 'success' });
        }catch(err){
            res.send({ message: err.message, status: 'error' });
        }
    }
}

module.exports = IncomeService;