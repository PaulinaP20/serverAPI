const express = require('express');
const router = express.Router();
const db = require('../db');

//testimonials

router.get('/', (req, res) => {
    res.json(db.testimonials);
}) 

router.get('/random', (req, res) => {
    const random = db.testimonials[Math.floor(Math.random()*db.testimonials.length)];
    res.json(random);
})

router.get('/:id', (req, res) => {
    const testimonial = db.testimonials.find(t => t.id === parseInt(req.params.id));
    if(testimonial) {
        res.json(testimonial)
    } else {
        res.status(404).json({error: 'testimonial not found'})
    }
})

router.post('/', (req, res) => {
    const {author, text} = req.body;
    if (!author || !text) {
        return res.status(404).json({error: 'try again'})
    }

    const newTestimonial = {
        id: db.testimonials.length ? db.testimonials[db.testimonials.length -1].id + 1 : 1,
        author,
        text
    };

    db.testimonials.push(newTestimonial);
    res.json({message: 'OK'})
})

router.put('/:id', (req, res) => {
    const {author, text} = req.body;
    const testimonial = db.testimonials.find(t => t.id === parseInt(req.params.id));

    if(!testimonial || !author || !text) {
        return res.status(404).json({error: 'error'})
    }

    testimonial.author = author;
    testimonial.text = text;

    res.json({message: 'OK'})

})

router.delete('/:id', (req, res) => {
    const index = db.testimonials.findIndex(t => t.id ===parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({error: 'error'});
    }

    db.testimonials.splice(index, 1);
    res.json({message: 'OK'})
})

module.exports = router;