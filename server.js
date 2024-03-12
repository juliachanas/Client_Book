const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = [
  { id: '1', author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: '2',
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
];

//endpoints

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.length);
  const randomTestimonial = db[randomIndex];
  res.json(randomTestimonial);
});

app.get('/testimonials/:id', (req, res) => {
  const testimonial = db.find((item) => item.id === req.params.id);
  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404).json({ error: 'Testimonial not found' });
  }
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  if (!author || !text) {
    return res.status(404).json({ error: 'Author and text are required' });
  }

  const newTestimonial = {
    id: uuidv4(),
    author,
    text,
  };

  db.push(newTestimonial);
  res.status(202).json({
    message: 'Testimonial added successfully',
    testimonial: newTestimonial,
  });
});

app.put('/testimonials/:id', (req, res) => {
  const testimonialId = req.params.id;
  const { author, text } = req.body;

  const testimonial = db.find((item) => item.id === testimonialId);

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

app.delete('/testimonials/:id', (req, res) => {
  const testimonialId = req.params.id;

  const testimonial = db.find((item) => item.id === testimonialId);

  if (!testimonial) {
    return res.status(404).json({ error: 'Testimonial not found' });
  }

  // Remove the testimonial from the array
  const index = db.indexOf(testimonial);
  db.splice(index, 1);

  return res.status(202).json({ message: 'Testimonial deleted successfully' });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
