const express = require('express');
const router = express.Router();
const SeatsController = require('../controllers/seats.controller');

router.get('/', SeatsController.getAllSeats);
router.get('/:id', SeatsController.getSeatById);
router.post('/', SeatsController.createSeat);
router.put('/:id', SeatsController.updateSeat);
router.delete('/:id', SeatsController.deleteSeat);

module.exports = router;
