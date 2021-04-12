const LegendariesService = require('../services/LegendariesService');
const fs = require("fs");

const controller = {
    index: (req, res) => {
        const legendary = LegendariesService.listLegendaries();
        res.json(legendary);
    },

    create: (req,res)=>{
        const {
            name,
            description,
            type,
            healthPoints,
            specialAttack,
            defense,
            attack,
            experience,
            specialDefense
        } = req.body;

        const legendary = LegendariesService.createLegendary(
            name,
            description,
            type,
            healthPoints,
            specialAttack,
            defense,
            attack,
            experience,
            specialDefense
        )

        res.json(legendary);
    },


    update: (req,res)=>{
       
        const {id} = req.params;

        const {
            name,
            description,
            type,
            healthPoints,
            specialAttack,
            defense,
            attack,
            experience,
            specialDefense
        } = req.body;

        const legendary = LegendariesService.updateLegendary(
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
        )

        res.json(legendary);

    },

    delete: (req,res)=>{
        const {id} = req.params;
        const legendary = LegendariesService.deleteLegendary(id)
        res.json(legendary);
    }
}


module.exports = controller;