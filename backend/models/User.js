const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: async (name, email, password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const result = await db.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hash]
    );
    return result.rows[0];
  },

  findByEmail: async (email) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  findById: async (id) => {
    const result = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }
};

module.exports = User;
