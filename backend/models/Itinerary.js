const db = require('../config/db');

const Itinerary = {
  create: async (tripId, dayNumber, activity, location, time, cost, notes) => {
    const result = await db.query(
      'INSERT INTO itinerary (trip_id, day_number, activity, location, time, cost, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [tripId, dayNumber, activity, location, time, cost, notes]
    );
    return result.rows[0];
  },

  getByTrip: async (tripId) => {
    const result = await db.query('SELECT * FROM itinerary WHERE trip_id = $1 ORDER BY day_number ASC, time ASC', [tripId]);
    return result.rows;
  },

  update: async (id, updates) => {
    const { activity, location, time, cost, notes } = updates;
    const result = await db.query(
      'UPDATE itinerary SET activity = $1, location = $2, time = $3, cost = $4, notes = $5 WHERE id = $6 RETURNING *',
      [activity, location, time, cost, notes, id]
    );
    return result.rows[0];
  },

  delete: async (id) => {
    await db.query('DELETE FROM itinerary WHERE id = $1', [id]);
  }
};

module.exports = Itinerary;
