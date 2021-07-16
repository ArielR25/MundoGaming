require('dotenv').config();
const { Router } = require('express');
const router = Router();
const fetch = require('node-fetch');
const { Videogame, Genero } = require ('../db.js');
const {API_KEY} = process.env;

router.get('/videogames', async (req, res) => {
    const { name, cant } = req.query;
    let games = [];
    
    try{
        if( !name ){
            if( !cant ) {
                await fetch(`https://api.rawg.io/api/games?key=${API_KEY}`)
                .then(result => result.json())
                .then( async data => {
                    index=0;
                    while( index < 15 ) {
                        const { id, background_image, name, genres } = data.results[index];
                        const game = {
                            id,
                            name,
                            image: background_image,
                            genres
                        }
                        games.push(game);
                        index++;
                    }
                })
            }
            else {
                let count = 0;
                let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
                while( count < cant && cant < 101 ) {
                    await fetch(url)
                    .then(result => result.json())
                    .then( async data => {
                        index=0;
                        while( count < cant && index < 20 ){
                            const { id, background_image, name, genres } = data.results[index];
                            const game = {
                                id,
                                name,
                                image: background_image,
                                genres
                            }
                            games.push(game);
                            index++
                            count++;
                        }
                        url = data.next;
                    })
                }
            }
            res.status(200).json(games);
        } 
        else {
            await fetch(`https://api.rawg.io/api/games?search=%${name}%&key=${API_KEY}`)
                .then(result => result.json())
                .then( async data => {
                    const count = data.results.length;
                    const video = await Videogame.findAll({
                        where: {
                            name
                        }
                    })
                    if( count || video.length ) {
                        index=0;
                        while( index < count && index < 15 ){
                            const { id, background_image, name, genres } = data.results[index];
                            const game = {
                                id,
                                name,
                                image: background_image,
                                genres
                            }
                            games.push(game);
                            index++
                        }
                        if( games.length < 15) {
                            const video = await Videogame.findAll({
                                where: { name },
                                include: { model: Genero },
                                include: { model: Plataforma },
                                limit: 15 - games.length
                            })
                            const formatedVideos = await video.map( v => {
                                const { id, name, image, generos } = v.dataValues
                                formatedGeneros = generos.map( g => {
                                    return {id: g.dataValues.ID, name: g.dataValues.name}
                                })
                                return {
                                    id,
                                    name,
                                    image,
                                    generos: formatedGeneros
                                }
                            })
                            games = games.concat(formatedVideos)
                        }
                        res.status(200).json(games);
                    } 
                    else {
                        res.status(200).json({notFound: 'No se encuentra ningun video juego con ese nombre.'})
                    }
                })
        }
    }catch(e){
        res.status(400).json(e)
    }
})

module.exports = router;