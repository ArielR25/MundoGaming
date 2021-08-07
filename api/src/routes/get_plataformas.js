require('dotenv').config();
const { Router } = require('express');
const router = Router();
const fetch = require('node-fetch');
const {API_KEY} = process.env;
const { Plataforma } = require ('../db.js');

router.get('/plataformas', async (req, res) => {
    await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
        .then( response => response.json())
        .then( data => {
            const plats = data.results
            plats.map(pl => {
                Plataforma.findOrCreate({
                    where: {
                        id: pl.id,
                        name: pl.name
                    }
                })
            })
        })
        .catch( error => {
            return res.status(400).json(error)
        })
    const platforms = await Plataforma.findAll();
    return res.status(200).json(platforms);
})

module.exports = router;