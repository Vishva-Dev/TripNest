const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authController = {
  signup: async (req, res) => {
    console.log('Signup attempt started:', { name: req.body.name, email: req.body.email });
    try {
      const { name, email, password } = req.body;
      console.log('Checking for existing user...');
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        console.log('User already exists:', email);
        return res.status(400).json({ message: 'User already exists' });
      }
      console.log('Creating new user...');
      const user = await User.create(name, email, password);
      console.log('User created successfully:', user.id);
      
      console.log('Signing JWT token...');
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      console.log('Signup complete.');
      res.status(201).json({ user, token });
    } catch (error) {
      console.error('CRITICAL SIGNUP ERROR:', error);
      res.status(500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      delete user.password_hash;
      res.json({ user, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = authController;
