require('dotenv').config();
const { Router } = require('express');
const router = Router();
const fetch = require('node-fetch')
const {API_KEY} = process.env;
const { Videogame, Genero } = require ('../db.js');

router.get('/videogame/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params;

    try{
        if( idVideogame.includes('-') ) {
            const videoGame = await Videogame.findOne({
                where: { id: idVideogame },
                include: { model: Genero }
            })
            return res.status(200).json(videoGame);
        }
        else {
            let game;
            await fetch(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
                .then( response => response.json())
                .then( data => {
                    const { background_image, name, genres, description, released, rating, platforms } = data;
                    game = {
                        image: background_image,
                        name,
                        genres,
                        description,
                        released,
                        rating,
                        platforms
                    }
                })
            console.log(game)
            if( game.name ) {
                return res.status(200).json(game);
            } else {
                return res.status(400).json({error: "not found"})
            }
        }
    }
    catch(e){
        return res.send(400).json({e})
    }
})

module.exports = router;