const LegendaryModel = require('../models/LegendaryModel');
const { v4:uuidv4 } = require('uuid');
const fs = require("fs");

const readFile= ()=>{
    const pokemonList = fs.readFileSync('./database/items.json', 'utf-8');
    return JSON.parse(pokemonList);
}

const LegendariesService = {

    listLegendaries: (req,res) => {
        const pokemonList = readFile();
        return pokemonList;
    },

    listPokemonData: (pokemonName) => {
        const pokemonList = LegendariesService.listLegendaries(); 
        let pokemon = pokemonList.find(item => item.name === pokemonName);

        if (!pokemon) {
            pokemon = pokemonList[0];
        }

        return pokemon;
    },

    createLegendary: (
        name,
        description,
        type,
        healthPoints,
        specialAttack,
        defense,
        attack,
        experience,
        specialDefense
    )=>{

        const pokemonList = readFile();
        let id = uuidv4();
        pokemonList.push({
            id,
            name,
            description,
            type,
            healthPoints,
            specialAttack,
            defense,
            attack,
            experience,
            specialDefense
        });
        try{
            fs.writeFileSync('./database/items.json', JSON.stringify(pokemonList), 'utf-8');
            return pokemonList;
        }catch (err){
            console.error(err);
        }
    },

    updateLegendary: (
        id,
        name,
        description,
        type,
        healthPoints,
        specialAttack,
        defense,
        attack,
        experience,
        specialDefense
    )=>{

        const pokemonList = readFile();
        const selectedPokemon = pokemonList.findIndex((item)=> item.id == id);
        if(selectedPokemon !== -1){     
        pokemonList[selectedPokemon] = {
            id,
            name,
            description,
            type,
            healthPoints,
            specialAttack,
            defense,
            attack,
            experience,
            specialDefense
        }
        fs.writeFileSync('./database/items.json', JSON.stringify(pokemonList), 'utf-8');

        return pokemonList[selectedPokemon];

        }else{
            return "ID not found";
        }
    },

    deleteLegendary : (id)=>{

        const pokemonList = readFile();
        const selectedPokemon = pokemonList.findIndex((item)=> item.id == id);
        if(selectedPokemon !== -1){     
        pokemonList.splice(selectedPokemon,1);
        fs.writeFileSync('./database/items.json', JSON.stringify(pokemonList), 'utf-8');
        return pokemonList;
        }else{
            return "ID not found";
        }

    }
}

module.exports = LegendariesService;