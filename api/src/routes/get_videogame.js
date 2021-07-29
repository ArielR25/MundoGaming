require('dotenv').config();
const { Router } = require('express');
const router = Router();
const fetch = require('node-fetch')
const {API_KEY} = process.env;
const { Videogame, Genero, Plataforma } = require ('../db.js');

function formatPlatforms (platforms) {
    return platforms.map( p => {
        return {
            id: p.platform.id,
            name: p.platform.name
        }
    })
}

router.get('/videogame/:idVideogame', async (req, res) => {
    const { idVideogame } = req.params;

    try{
        if( idVideogame.includes('-') ) {
            try{
                const videoGame = await Videogame.findOne({
                    where: { id: idVideogame },
                    include: [{ model: Genero } , { model: Plataforma }]
                })
                if( videoGame ){
                    return res.status(200).json(videoGame);
                }
            }catch{
                return res.status(400).json({error: "not found"})
            }
            }
        else {
            let game;
            await fetch(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
                .then( response => response.json())
                .then( data => {
                    let { background_image, name, genres, description, released, rating, platforms } = data;
                    platforms = formatPlatforms(platforms)
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
            if( game.name ) {
                return res.status(200).json(game);
            }
        }
        return res.status(400).json({error: "not found"})
    }
    catch(e){
        return res.send(400).json({e})
    }
})

module.exports = router;