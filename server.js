const express = require('express');
const db = require('./db.js');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();

//import routes

const testimonialRoutes = require('./routes/testimonials.routes.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', testimonialRoutes);

//endpoints testimonials

// app.get('/testimonials/:id', (req, res) => {
//   const testimonial = db.testimonials.find((item) => item.id === req.params.id);
//   if (testimonial) {
//     res.json(testimonial);
//   } else {
//     res.status(404).json({ error: 'Testimonial not found' });
//   }
// });

// app.post('/testimonials', (req, res) => {
//   const { author, text } = req.body;
//   if (!author || !text) {
//     return res.status(404).json({ error: 'Author and text are required' });
//   }

//   const newTestimonial = {
//     id: uuidv4(),
//     author,
//     text,
//   };

//   db.testimonials.push(newTestimonial);
//   res.status(202).json({
//     message: 'Testimonial added successfully',
//     testimonial: newTestimonial,
//   });
// });

// app.put('/testimonials/:id', (req, res) => {
//   const testimonialId = req.params.id;
//   const { author, text } = req.body;

//   const testimonial = db.testimonials.find((item) => item.id === testimonialId);

//   if (!testimonial) {
//     return res.status(404).json({ error: 'Testimonial not found' });
//   }

//   if (author && text) {
//     testimonial.author = author;
//     testimonial.text = text;
//     return res
//       .status(202)
//       .json({ message: 'Testimonial updated successfully', testimonial });
//   } else {
//     return res.status(404).json({ error: 'Author and text are required' });
//   }
// });

// app.delete('/testimonials/:id', (req, res) => {
//   const testimonialId = req.params.id;

//   const testimonial = db.testimonials.find((item) => item.id === testimonialId);

//   if (!testimonial) {
//     return res.status(404).json({ error: 'Testimonial not found' });
//   }

//   // Remove the testimonial from the array
//   const index = db.testimonials.indexOf(testimonial);
//   db.testimonials.splice(index, 1);

//   return res.status(202).json({ message: 'Testimonial deleted successfully' });
// });

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
