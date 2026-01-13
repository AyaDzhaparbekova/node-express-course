const express = require('express');
const router = express.Router();

const {
  getPeople,
  getPerson,
  addPerson,
  updatePerson,
  deletePerson,
} = require('../controllers/people');

router.get('/', getPeople);
router.get('/:id', getPerson);
router.post('/', addPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

router.get('/', (req, res) => {
  res.json(people);
});

router.get('/:id', getPerson);

router.post('/', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a name' });
  }

  people.push({ id: people.length + 1, name });
  res.status(201).json({ success: true, name });
});

module.exports = router;
