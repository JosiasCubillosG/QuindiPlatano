const express = require('express');
const router = express.Router();
const IncomesService = require('../../services/incomes');

router.get('/', IncomesService.getIncomes);
router.post('/', IncomesService.createIncome);
router.get('/:incomeId', IncomesService.getIncome);
router.put('/:incomeId', IncomesService.updateIncome);
router.delete('/:incomeId', IncomesService.deleteIncome);

module.exports = router;