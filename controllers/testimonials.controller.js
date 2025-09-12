const Testimonial = require('../models/testimonials.model');

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRandomTestimonial = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const random = Math.floor(Math.random() * count);
    const testimonial = await Testimonial.findOne().skip(random);
    if (!testimonial) return res.status(404).json({ error: 'Not found' });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Not found' });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTestimonial = async (req, res) => {
  const { author, text } = req.body;

  if (!author || !text) {
    return res.status(400).json({ error: 'Author and text are required' });
  }

  try {
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    res.status(201).json({ message: 'Created', testimonial: newTestimonial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  const { author, text } = req.body;

  if (!author || !text) {
    return res.status(400).json({ error: 'Author and text are required' });
  }

  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Not found' });

    testimonial.author = author;
    testimonial.text = text;
    await testimonial.save();

    res.json({ message: 'Updated', testimonial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Not found' });

    await Testimonial.deleteOne({ _id: req.params.id });
    res.json({ message: 'Deleted', testimonial });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
