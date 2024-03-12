const express = require('express');
const db = require('./db.js');
const cors = require('cors');

const app = express();

//import routes

const testimonialRoutes = require('./routes/testimonials.routes.js');
const concertRoutes = require('./routes/concerts.routes.js');
const seatRoutes = require('./routes/seats.routes.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatRoutes);

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
