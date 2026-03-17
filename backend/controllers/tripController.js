const Trip = require('../models/Trip');

const tripController = {
  createTrip: async (req, res) => {
    try {
      const { origin, destination, startDate, endDate, budget, travelers } = req.body;
      const userId = req.user.id;
      const trip = await Trip.create(userId, origin, destination, startDate, endDate, budget, travelers);
      res.status(201).json(trip);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTrips: async (req, res) => {
    try {
      const userId = req.user.id;
      const trips = await Trip.getAllByUser(userId);
      res.json(trips);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getTripById: async (req, res) => {
    try {
      const trip = await Trip.getById(req.params.id, req.user.id);
      if (!trip) return res.status(404).json({ message: 'Trip not found' });
      res.json(trip);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateTrip: async (req, res) => {
    try {
      const trip = await Trip.update(req.params.id, req.user.id, req.body);
      if (!trip) return res.status(404).json({ message: 'Trip not found' });
      res.json(trip);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteTrip: async (req, res) => {
    try {
      await Trip.delete(req.params.id, req.user.id);
      res.json({ message: 'Trip deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = tripController;
