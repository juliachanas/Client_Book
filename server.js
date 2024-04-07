const express = require('express');
const db = require('./db.js');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const app = express();

//import routes

const testimonialRoutes = require('./routes/testimonials.routes.js');
const concertRoutes = require('./routes/concerts.routes.js');
const seatRoutes = require('./routes/seats.routes.js');

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', testimonialRoutes);
app.use('/api', concertRoutes);
app.use('/api', seatRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);
