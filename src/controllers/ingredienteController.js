const Ingrediente = require('../models/Ingrediente')
 
async function getAll(req, res) {
    try {
        const ingredientes = await Ingrediente.find({});
        return res.status(200).json(ingredientes);
    } catch (err) {
        console.error('ERROR <getAll>', err);
        return res.status(500).send();
    }
}

async function getOne(req, res) {
    try {
        const { params: { id } } = req;
        const ingrediente = await Ingrediente.findById(id);
        if (!ingrediente) return res.status(404).send('Ingrediente não encontrado');
        return res.status(200).json(ingrediente);
    } catch(err){
        console.error('ERROR <getOne>', err);
        return res.status(500).send();
    }
}

async function insert(req, res) {
    const { body } = req;
    try {
        const ingrediente = await Ingrediente.create(body);
        return res.status(200).json(ingrediente);
    } catch (err) {
        console.error('ERROR <insert>', err);
        return res.status(500).send();
    }
}

async function deleteOne(req, res) {
    const { params: { id } } = req;
    try {
        const ingrediente = await Ingrediente.findByIdAndDelete(id);
        if (!ingrediente) {
            return res.status(404).send('Ingrediente não encontrado');
        }
        return res.status(200).json(ingrediente);
    } catch (err) {
        console.error('ERROR <deleteOne>', err);
        return res.status(500).send();
    }
}

module.exports = {
    getAll,
    getOne,
    insert,
    deleteOne,
}