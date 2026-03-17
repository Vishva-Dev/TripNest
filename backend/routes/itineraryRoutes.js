const express = require('express');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const auth = require('../middleware/auth');

router.post('/', auth, itineraryController.addActivity);
router.get('/:tripId', auth, itineraryController.getItinerary);
router.put('/:id', auth, itineraryController.updateActivity);
router.delete('/:id', auth, itineraryController.deleteActivity);

module.exports = router;
