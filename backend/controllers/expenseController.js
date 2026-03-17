const Expense = require('../models/Expense');

const expenseController = {
  addExpense: async (req, res) => {
    try {
      const { tripId, category, amount, notes, date } = req.body;
      const expense = await Expense.create(tripId, category, amount, notes, date);
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getExpenses: async (req, res) => {
    try {
      const { tripId } = req.params;
      const expenses = await Expense.getByTrip(tripId);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateExpense: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedExpense = await Expense.update(id, req.body);
      if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
      res.json(updatedExpense);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteExpense: async (req, res) => {
    try {
      const { id } = req.params;
      await Expense.delete(id);
      res.json({ message: 'Expense deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBudgetSummary: async (req, res) => {
    try {
      const { tripId } = req.params;
      const summary = await Expense.getSummaryByTrip(tripId);
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = expenseController;
