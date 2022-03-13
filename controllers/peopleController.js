const Person = require('../models/person');

exports.people_index = async (req, res) => {
    const people = await Person.find();
    res.json(people);
}