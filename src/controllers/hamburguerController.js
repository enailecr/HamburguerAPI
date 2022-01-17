const Hamburguer = require('../models/Hamburguer')
 
async function getAll(req, res) {
    try {
        const hamburguers = await Hamburguer.find({});
        return res.status(200).json(hamburguers);
    } catch (err) {
        console.error('ERROR <getAll>', err);
        return res.status(500).send();
    }
}

async function getOne(req, res) {
    try {
        const { params: { _id : id } } = req;
        const hamburguer = Hamburguer.findOneById(id);
        return res.status(200).json(hamburguer);
    } catch(err){
        console.error('ERROR <getOne>', err);
        return res.status(500).send();
    }
}

async function insert(req, res) {
    const { body } = req;
    try {
        const hamburguer = await Hamburguer.create(body);
        return res.status(200).json(hamburguer);
    } catch (err) {
        console.error('ERROR <insert>', err);
        return res.status(500).send();
    }
}

async function deleteOne(req, res) {
    const { params: { _id : id } } = req;
    try {
        const hamburguer = await Hamburguer.findOneByIdAndRemove(id);
        if (!hamburguer) {
            return res.status(404).send('País não encontrado');
        }
        return res.status(200).json(hamburguer);
    } catch (err) {
        console.error('ERROR <deleteOne>', err);
        return res.status(500).send();
    }
}

async function updateOne(req, res) {
    const { body, params: { _id : id } } = req;
    try {
        const hamburguer = await Hamburguer.findOneByIdAndUpdate(id, body);
        return res.status(200).json(hamburguer);
    } catch (err) {
        console.error('ERROR <updateOne>', err);
        return res.status(500).send();
    }
}

module.exports = {
    getAll,
    getOne,
    insert,
    deleteOne,
    updateOne,
}