require('dotenv').config();
const { Router } = require('express');
const router = Router();
const { Videogame } = require ('../db.js');
//const fetch = require('node-fetch')

router.post('/videogame', async (req, res) => {
    console.log(req.body)
    const { image, name, genre, description, released, rating, plat } = req.body;
    try{
        const video = await Videogame.create({
            image,
            name,
            description,
            released,
            rating
        })
        await video.addGenero(genre)
        await video.addPlataforma(plat)
        res.status(200).json(video)
    }
    catch(e){
        res.status(400).json(e)
    }
})

module.exports = router;