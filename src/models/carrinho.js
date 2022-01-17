const mongoose = require('mongoose')

const CarrinhoSchema = new mongoose.Schema({
    total: { 
        type: Number,
        required: true,
        default: 0,
    },
    hamburguers: { type: mongoose.Schema.Types.ObjectId, ref: 'Hamburguer' },
})
;

module.exports = mongoose.model("Carrinho", CarrinhoSchema);