const express = require('express');
const router = express.Router();
const db = require('../db');

//seats

router.get('/', (req, res) => {
    res.json(db.seats);
})

router.get('/:id', (req, res) => {
    const seat = db.seats.find(s => s.id === parseInt(req.params.id));
    if(seat) {
        res.json(seat)
    } else {
        res.status(404).json({error: 'seat not found'});
    }
});

router.post('/', (req, res) => {
    const {day, seat, client, email} = req.body;

    if(!day || !seat || !client ||!email ) {
        return res.status(404).json({error: 'all seat fields are required'})
    }

    const newSeat = {
        id: db.seats.length ? db.seats[db.seats.length -1].id + 1 : 1,
        day,
        seat,
        client,
        email
    }

    db.seats.push(newSeat);
    res.json({message: 'OK'});
});

router.put('/:id', (req, res) => {
    const {day, seat, client, email} = req.body;
    const seatObj = db.seats.find(c => c.id === parseInt(req.params.id));

    if(!seatObj) {
        return res.status(404).json({ error: 'seat not found' });
    }

    if (!day ||!seat || !client || !email) {
        return res.status(400).json({ error: 'All seat fields are required' });
    }

     seatObj.day = day;
     seatObj.seat = seat;
     seatObj.client = client;
     seatObj.email = email;

     res.json(seatObj);
})

router.delete('/:id', (req, res) => {
  const index = db.seats.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'seat not found' });
  }

  const deleted = db.seats.splice(index, 1);
  res.json({message: 'OK'});
});

module.exports = router;