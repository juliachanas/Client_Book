const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const db = require('./../db.js');

//all testimonials
router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

//random testimonial
router.route('/testimonials/random').get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  const randomTestimonial = db.testimonials[randomIndex];
  res.json(randomTestimonial);
});

//testimonial by id
router.route('/testimonials/:id').get((req, res) => {
  const testimonial = db.testimonials.find((item) => item.id === req.params.id);
  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404).json({ error: 'Testimonial not found' });
  }
});

//add testimonial

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(404).json({ error: 'Author and text are required' });
  }

  const newTestimonial = {
    id: uuidv4(),
    author,
    text,
  };

  db.testimonials.push(newTestimonial);
  res.status(202).json({
    message: 'Testimonial added successfully',
    testimonial: newTestimonial,
  });
});

//update testimonial

router.route('/testimonials/:id').put((req, res) => {
  const testimonialId = req.params.id;
  const { author, text } = req.body;

  const testimonial = db.testimonials.find((item) => item.id === testimonialId);

  if (!testimonial) {
    return res.status(404).json({ error: 'Testimonial not found' });
  }

  if (author && text) {
    testimonial.author = author;
    testimonial.text = text;
    return res
      .status(202)
      .json({ message: 'Testimonial updated successfully', testimonial });
  } else {
    return res.status(404).json({ error: 'Author and text are required' });
  }
});

// delete testimonial

router.route('/testimonials/:id').delete((req, res) => {
  const testimonialId = req.params.id;

  const testimonial = db.testimonials.find((item) => item.id === testimonialId);

  if (!testimonial) {
    return res.status(404).json({ error: 'Testimonial not found' });
  }

  // Remove the testimonial from the array
  const index = db.testimonials.indexOf(testimonial);
  db.testimonials.splice(index, 1);

  return res.status(202).json({ message: 'Testimonial deleted successfully' });
});

module.exports = router;
