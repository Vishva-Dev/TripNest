const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const auth = require('../middleware/auth');

router.post('/', auth, expenseController.addExpense);
router.get('/:tripId', auth, expenseController.getExpenses);
router.get('/:tripId/summary', auth, expenseController.getBudgetSummary);
router.put('/:id', auth, expenseController.updateExpense);
router.delete('/:id', auth, expenseController.deleteExpense);

module.exports = router;
