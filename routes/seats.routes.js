//endpoints seats

app.get('/seats', (req, res) => {
  res.json(db.seats);
});

app.get('/seats/:id', (req, res) => {
  const seat = db.seats.find((item) => item.id === req.params.id);
  if (seat) {
    res.json(seat);
  } else {
    res.status(404).json({ error: 'Seat not found' });
  }
});

app.post('/seats', (req, res) => {
  const { day, seat, client, email } = req.body;
  if (!day || !seat || !client || !email) {
    return res
      .status(404)
      .json({ error: 'Day, seat, client and email are required' });
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

app.delete('/seats/:id', (req, res) => {
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

app.put('/seats/:id', (req, res) => {
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
