const Carrinho = require('../models/carrinho')

async function insert(req, res) {
    const { body } = req;
    try {
        const carrinhho = await Carrinho.create(body);
        return res.status(200).json(carrinhho);
    } catch (err) {
        console.error('ERROR <insert>', err);
        return res.status(500).send();
    }
}

async function updateOne(req, res) {
    const { body, params: { _id : id } } = req;
    try {
        const carrinhho = await Carrinho.findOneByIdAndUpdate(id, body);
        return res.status(200).json(carrinhho);
    } catch (err) {
        console.error('ERROR <updateOne>', err);
        return res.status(500).send();
    }
}

module.exports = {
    insert,
    updateOne,
}