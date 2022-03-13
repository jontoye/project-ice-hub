const Arena = require('../models/arena');

exports.arenas_index = async (req, res) => {
    const arenas = await Arena.find();
    res.json(arenas);
}