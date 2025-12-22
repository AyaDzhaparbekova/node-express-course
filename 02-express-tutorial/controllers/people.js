const { people } = require('../data');

// GET all people
const getPeople = (req, res) => {
  res.json(people);
};

// GET person by id
const getPerson = (req, res) => {
  const id = Number(req.params.id);
  const person = people.find(p => p.id === id);

  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: 'Person not found' });
  }

  res.status(200).json(person);
};

// POST add person
const addPerson = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a name' });
  }

  people.push({ id: people.length + 1, name });
  res.status(201).json({ success: true, name });
};

// PUT update person
const updatePerson = (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const person = people.find(p => p.id === id);
  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: 'Person not found' });
  }

  person.name = name;
  res.status(200).json({ success: true, data: people });
};

// DELETE person
const deletePerson = (req, res) => {
  const id = Number(req.params.id);
  const person = people.find(p => p.id === id);

  if (!person) {
    return res
      .status(404)
      .json({ success: false, message: 'Person not found' });
  }

  const newPeople = people.filter(p => p.id !== id);
  res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
  getPeople,
  getPerson,
  addPerson,
  updatePerson,
  deletePerson,
};
