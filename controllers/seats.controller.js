const Seat = require('../models/seats.model');

exports.getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSeatById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) return res.status(404).json({ error: 'Seat not found' });
    res.json(seat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;

  if (!day || !seat || !client || !email) {
    return res.status(400).json({ message: 'Missing data in request body' });
  }

  try {
    const existingSeat = await Seat.findOne({ day, seat });
    if (existingSeat) {
      return res.status(409).json({ message: 'The slot is already taken...' });
    }

    const newSeat = new Seat({ day, seat, client, email });
    await newSeat.save();

    req.io.emit('seatsUpdated');

    res.status(201).json({ message: 'OK', seat: newSeat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;

  if (!day || !seat || !client || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const seatToUpdate = await Seat.findById(req.params.id);
    if (!seatToUpdate) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    seatToUpdate.day = day;
    seatToUpdate.seat = seat;
    seatToUpdate.client = client;
    seatToUpdate.email = email;

    await seatToUpdate.save();

    res.json({ message: 'Updated', seat: seatToUpdate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSeat = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    await Seat.deleteOne({ _id: req.params.id });

    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
