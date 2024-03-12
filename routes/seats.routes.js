const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const db = require('./../db.js');

//all seats
router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

//seat by id
router.route('/seats/:id').get((req, res) => {
  const seat = db.seats.find((item) => item.id === req.params.id);
  if (seat) {
    res.json(seat);
  } else {
    res.status(404).json({ error: 'Seat not found' });
  }
});

//add
router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  if (!day || !seat || !client || !email) {
    return res
      .status(404)
      .json({ error: 'Day, seat, client and email are required' });
  }

  const takenSeat = db.seats.find(
    (elem) => elem.day == req.body.day && elem.seat == req.body.seat
  );

  if (takenSeat) {
    return res.status(404).json({ error: 'The slot is already taken...' });
  }

  const newSeat = {
    id: uuidv4(),
    day,
    seat,
    client,
    email,
  };

  db.seats.push(newSeat);
  res.status(202).json({
    message: 'Seat added successfully',
    seat: newSeat,
  });
});

//delete seat
router.route('/seats/:id').delete((req, res) => {
  const seatId = req.params.id;

  const seat = db.seats.find((item) => item.id === seatId);

  if (!seat) {
    return res.status(404).json({ error: 'Seat not found' });
  }

  // Remove the seat from the array
  const index = db.seats.indexOf(seat);
  db.seats.splice(index, 1);

  return res.status(202).json({ message: 'Seats deleted successfully' });
});

//update
router.route('/seats/:id').put((req, res) => {
  const seatId = req.params.id;
  const { day, seat, client, email } = req.body;

  const updatedSeat = db.seats.find((item) => item.id === seatId);

  if (!updatedSeat) {
    return res.status(404).json({ error: 'Seat not found' });
  }

  if (day && seat && client && email) {
    updatedSeat.day = day;
    updatedSeat.seat = seat;
    updatedSeat.client = client;
    updatedSeat.email = email;
    return res
      .status(202)
      .json({ message: 'Seat updated successfully', updatedSeat });
  } else {
    return res
      .status(404)
      .json({ error: 'Day, seat, client and email are required' });
  }
});

module.exports = router;
