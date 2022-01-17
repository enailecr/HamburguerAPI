const mongoose = require('mongoose')

const IngredienteSchema = new mongoose.Schema({
    nome: { 
        type: String,
        required: true
    },
    valor: { 
        type: Number,
        required: true
    },
});

module.exports = mongoose.model("Ingrediente", IngredienteSchema);