const Itinerary = require('../models/Itinerary');

const itineraryController = {
  addActivity: async (req, res) => {
    try {
      const { tripId, dayNumber, activity, location, time, cost, notes } = req.body;
      const newItem = await Itinerary.create(tripId, dayNumber, activity, location, time, cost, notes);
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getItinerary: async (req, res) => {
    try {
      const { tripId } = req.params;
      const items = await Itinerary.getByTrip(tripId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateActivity: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedItem = await Itinerary.update(id, req.body);
      if (!updatedItem) return res.status(404).json({ message: 'Activity not found' });
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteActivity: async (req, res) => {
    try {
      const { id } = req.params;
      await Itinerary.delete(id);
      res.json({ message: 'Activity deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = itineraryController;
