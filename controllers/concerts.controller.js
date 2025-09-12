const Concert = require('../models/concerts.model');

exports.getAllConcerts = async (req, res) => {
  try {
    const concerts = await Concert.find();
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getConcertById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) {
      return res.status(404).json({ error: 'Concert not found' });
    }
    res.json(concert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createConcert = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  if (!performer || !genre || !price || !day || !image) {
    return res.status(400).json({ error: 'Missing data in request body' });
  }

  try {
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    res.status(201).json({ message: 'Concert created', concert: newConcert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteConcert = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) {
      return res.status(404).json({ error: 'Concert not found' });
    }

    await Concert.deleteOne({ _id: req.params.id });
    res.json({ message: 'Concert deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
