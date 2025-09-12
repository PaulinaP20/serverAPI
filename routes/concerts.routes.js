const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller');

router.get('/', ConcertController.getAllConcerts);
router.get('/:id', ConcertController.getConcertById);
router.post('/', ConcertController.createConcert);
router.delete('/:id', ConcertController.deleteConcert);

module.exports = router;