const express = require('express');
const router = express.Router();
const ExpenseService = require('../../services/expenses');

router.get('/', ExpenseService.getExpenses);
router.post('/', ExpenseService.createExpense);
router.get('/:expenseId', ExpenseService.getExpense);
router.put('/:expenseId', ExpenseService.updateExpense);
router.delete('/:expenseId', ExpenseService.deleteExpense);

module.exports = router;