const express = require('express');
const router = express.Router();
const db = require('../db');

//concerts
router.get('/', (req, res) => {
    res.json(db.concerts)
});

router.get('/:id', (req, res) => {
    const concert = db.concerts.find(c => c.id === parseInt(req.params.id));
    if (concert) {
        res.json(concert);
    } else {
        return res.status(404).json({error: 'error'});
    }
})

router.post('/', (req, res) => {
    const {performer, genre, price, day, image} = req.body;
    if(!performer || !genre || !price ||!day || !image) {
        return res.status(404).json({error: 'error'})
    }

    const newConcert = {
        id: db.concerts.length ? db.concerts[db.concerts.length - 1].id + 1 : 1,
        performer,
        genre,
        price,
        day,
        image
    }

    db.concerts.push(newConcert);
    res.json(newConcert);
})

router.delete('/:id', (req, res) => {
    const index = db.concerts.findIndex(c => c.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({error: 'concert not found'})
    }

    const deleted = db.concerts.splice(index, 1);
    res.json({message: 'OK'});

})

module.exports = router;