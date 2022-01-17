const mongoose = require('mongoose')

const HamburguerSchema = new mongoose.Schema({
    nome: { 
        type: String,
        required: true
    },
    ingredientes: [{ 
        ingrediente: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingrediente' },
        qtd: {
            type: Number,
            required: true,
            default: 0,
        }
    }],
    valorComDesconto:{
        type: Number,
    }
});

module.exports = mongoose.model("Hamburger", HamburguerSchema);