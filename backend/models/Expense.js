const db = require('../config/db');

const Expense = {
  create: async (tripId, category, amount, notes, date) => {
    const result = await db.query(
      'INSERT INTO expenses (trip_id, category, amount, notes, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [tripId, category, amount, notes, date]
    );
    return result.rows[0];
  },

  getByTrip: async (tripId) => {
    const result = await db.query('SELECT * FROM expenses WHERE trip_id = $1 ORDER BY date DESC', [tripId]);
    return result.rows;
  },

  update: async (id, updates) => {
    const { category, amount, notes, date } = updates;
    const result = await db.query(
      'UPDATE expenses SET category = $1, amount = $2, notes = $3, date = $4 WHERE id = $5 RETURNING *',
      [category, amount, notes, date, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await db.query('DELETE FROM expenses WHERE id = $1', [id]);
  },

  getSummaryByTrip: async (tripId) => {
    const result = await db.query(
      'SELECT category, SUM(amount) as total FROM expenses WHERE trip_id = $1 GROUP BY category',
      [tripId]
    );
    return result.rows;
  }
};

module.exports = Expense;
