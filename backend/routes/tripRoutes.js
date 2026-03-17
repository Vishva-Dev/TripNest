const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const auth = require('../middleware/auth');

router.post('/', auth, tripController.createTrip);
router.get('/', auth, tripController.getTrips);
router.get('/:id', auth, tripController.getTripById);
router.put('/:id', auth, tripController.updateTrip);
router.delete('/:id', auth, tripController.deleteTrip);

module.exports = router;
