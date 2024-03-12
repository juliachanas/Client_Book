const express = require('express');
const db = require('./db.js');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

//endpoints testimonials

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  const randomTestimonial = db.testimonials[randomIndex];
  res.json(randomTestimonial);
});

app.get('/testimonials/:id', (req, res) => {
  const testimonial = db.testimonials.find((item) => item.id === req.params.id);
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

  db.testimonials.push(newTestimonial);
  res.status(202).json({
    message: 'Testimonial added successfully',
    testimonial: newTestimonial,
  });
});

app.put('/testimonials/:id', (req, res) => {
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

app.delete('/testimonials/:id', (req, res) => {
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

// endpoints concerts

app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

app.get('/concerts/:id', (req, res) => {
  const concert = db.concerts.find((item) => item.id === req.params.id);
  if (concert) {
    res.json(concert);
  } else {
    res.status(404).json({ error: 'Concert not found' });
  }
});

app.post('/concerts', (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  if (!performer || !genre || !price || !day) {
    return res
      .status(404)
      .json({ error: 'Performer, genre, price and day are required' });
  }

  const newConcert = {
    id: uuidv4(),
    performer,
    genre,
    price,
    day,
    image,
  };

  db.concerts.push(newConcert);
  res.status(202).json({
    message: 'Concert added successfully',
    concert: newConcert,
  });
});

app.delete('/concerts/:id', (req, res) => {
  const concertId = req.params.id;

  const concert = db.concerts.find((item) => item.id === concertId);

  if (!concert) {
    return res.status(404).json({ error: 'Concert not found' });
  }

  // Remove the concert from the array
  const index = db.concerts.indexOf(concert);
  db.concerts.splice(index, 1);

  return res.status(202).json({ message: 'Concert deleted successfully' });
});

app.put('/concerts/:id', (req, res) => {
  const concertId = req.params.id;
  const { performer, genre, price, day, image } = req.body;

  const concert = db.concerts.find((item) => item.id === concertId);

  if (!concert) {
    return res.status(404).json({ error: 'Concert not found' });
  }

  if (performer && genre && price && day && image) {
    concert.performer = performer;
    concert.genre = genre;
    concert.price = price;
    concert.day = day;
    concert.image = image;
    return res
      .status(202)
      .json({ message: 'Concert updated successfully', concert });
  } else {
    return res
      .status(404)
      .json({ error: 'Performer, genre, price and day are required' });
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
