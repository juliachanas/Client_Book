const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const db = require('./../db.js');

//all concerts

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

// concert  by id
router.route('/concerts/:id').get((req, res) => {
  const concert = db.concerts.find((item) => item.id === req.params.id);
  if (concert) {
    res.json(concert);
  } else {
    res.status(404).json({ error: 'Concert not found' });
  }
});

//add concert
router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  if (!performer || !genre || !price || !day || !image) {
    return res
      .status(404)
      .json({ error: 'Performer, genre, price, day and image are required' });
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

//delete concert
router.route('/concerts/:id').delete((req, res) => {
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

//update concert
router.route('/concerts/:id').put((req, res) => {
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

module.exports = router;
