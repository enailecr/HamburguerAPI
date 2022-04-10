const hamburguer = require("../models/hamburguer");

function validatePromocao(hamburguers) {
    const newHamburguers = calculateTotalHamburguer(hamburguers);
    return calculateTotalCarrinho(newHamburguers);
}

function calculateTotalCarrinho(hamburguers) {
    const total = hamburguers.reduce((soma, hamburguer) => soma + (!hamburguer.valorComDesconto ? hamburguer.ingredientes.reduce((soma, ingrediente) => soma + (ingrediente.ingrediente.valor * ingrediente.qtd)) : valorComDesconto));
    const carrinho = {
        total,
        hamburguers
    }
    return carrinho;
}

function calculateTotalHamburguer(hamburguers) {
    return hamburguers.map((hamburguer) => {
        let total = null;
        if (isLight(hamburguer)) total = light(hamburguer);
        if (hasMuitaCarne(hamburguer)) total = muitaCarne(hamburguer);
        if (hasMuitoQueijo(hamburguer)) total = muitoQueijo(hamburguer);
        if (!total) hamburguer.valorComDesconto = total;
        return hamburguer;
    });
}

function isLight(hamburguer) {
    return hamburguer.ingredientes.some( ingrediente => ingrediente.ingrediente.nome == 'Alface') && !hamburguer.ingredientes.some( ingrediente => ingrediente.ingrediente.nome == 'Bacon');
} 

function hasMuitaCarne(hamburguer) {
    const carne = hamburguer.ingredientes.find(ingrediente => ingrediente.ingrediente.nome == 'Carne');
    if (!carne) return false;
    return isDivisibleby3(carne.qtd);
}

function hasMuitoQueijo(hamburguer) {
    const queijo = hamburguer.ingredientes.find(ingrediente => ingrediente.ingrediente.nome == 'Queijo');
    if (!queijo) return false;
    return isDivisibleby3(queijo.qtd);
}

function light(hamburguer) {
    const total = hamburguer.ingredientes.reduce((soma, ingrediente) => soma + (ingrediente.ingrediente.valor * ingrediente.qtd));
    return total * 0,9;
}

function muitaCarne(hamburguer) {
    const carne = hamburguer.ingredientes.find(ingrediente => ingrediente.ingrediente.nome == 'Carne');
    const novaQtd = divisionBy3(carne.qtd);
    return hamburguer.ingredientes.reduce((soma, ingrediente) => {
        if (ingrediente.ingrediente.nome == 'Carne') {
            return soma + ingrediente.ingrediente.valor * novaQtd;
        }
        return soma + (ingrediente.ingrediente.valor * ingrediente.qtd);
    });     
}

function muitoQueijo(hamburguer) {
    const queijo = hamburguer.ingredientes.find(ingrediente => ingrediente.ingrediente.nome == 'Queijo');
    const novaQtd = divisionBy3(queijo.qtd);
    return hamburguer.ingredientes.reduce((soma, ingrediente) => {
        if (ingrediente.ingrediente.nome == 'Queijo') {
            return soma + ingrediente.ingrediente.valor * novaQtd;
        }
        return soma + (ingrediente.ingrediente.valor * ingrediente.qtd);
    });   
}

function isDivisibleby3(number) {
    if (number%3 == 0) {
       return true;
    }
    return false;
}

function divisionBy3(number) {
    return number - number/3;
}