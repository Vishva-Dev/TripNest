const db = require('../config/db');

const Trip = {
  create: async (userId, origin, destination, startDate, endDate, budget, travelers) => {
    const result = await db.query(
      'INSERT INTO trips (user_id, origin, destination, start_date, end_date, budget, travelers) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [userId, origin, destination, startDate, endDate, budget, travelers]
    );
    return result.rows[0];
  },

  getAllByUser: async (userId) => {
    const result = await db.query('SELECT * FROM trips WHERE user_id = $1 ORDER BY start_date DESC', [userId]);
    return result.rows;
  },

  getById: async (id, userId) => {
    const result = await db.query('SELECT * FROM trips WHERE id = $1 AND user_id = $2', [id, userId]);
    return result.rows[0];
  },

  update: async (id, userId, updates) => {
    const { origin, destination, start_date, end_date, budget, travelers } = updates;
    const result = await db.query(
      'UPDATE trips SET origin = $1, destination = $2, start_date = $3, end_date = $4, budget = $5, travelers = $6 WHERE id = $7 AND user_id = $8 RETURNING *',
      [origin, destination, start_date, end_date, budget, travelers, id, userId]
    );
    return result.rows[0];
  },

  delete: async (id, userId) => {
    await db.query('DELETE FROM trips WHERE id = $1 AND user_id = $2', [id, userId]);
  }
};

module.exports = Trip;
