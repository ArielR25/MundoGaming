require('dotenv').config();
const { Router } = require('express');
const router = Router();
const fetch = require('node-fetch')
const {API_KEY} = process.env;
const { Genero } = require ('../db.js');

router.get('/genres', async (req, res) => {
    try{
        await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            .then( response => response.json())
            .then( data => {
                const genres = data.results
                genres.map(genre => {
                    Genero.findOrCreate({
                        where: {
                            id: genre.id,
                            name: genre.name
                        }
                    })
                })
            })
        let genres = await Genero.findAll()
        return res.status(200).json(genres)
    }catch(e){
        return res.status(400).json(e)
    }
})

module.exports = router;



//  GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí