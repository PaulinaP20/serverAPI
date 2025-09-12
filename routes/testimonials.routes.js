const express = require('express');
const router = express.Router();
const TestimonialsController = require('../controllers/testimonials.controller');

router.get('/', TestimonialsController.getAllTestimonials);
router.get('/random', TestimonialsController.getRandomTestimonial);
router.get('/:id', TestimonialsController.getTestimonialById);
router.post('/', TestimonialsController.createTestimonial);
router.put('/:id', TestimonialsController.updateTestimonial);
router.delete('/:id', TestimonialsController.deleteTestimonial);

module.exports = router;
