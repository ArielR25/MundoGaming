require('dotenv').config();
const { Router } = require('express');
const router = Router();
const fetch = require('node-fetch');
const { Videogame, Genero, Plataforma } = require ('../db.js');
const {API_KEY} = process.env;

function formatPlatforms (platforms) {
    return platforms.map( p => {
        return {
            id: p.platform.id,
            name: p.platform.name
        }
    })
}

function dataProcessor(data) {
    let { id, background_image, name, genres, platforms, rating } = data.results[index];
    platforms = formatPlatforms(platforms);
    const game = {
        id,
        name,
        image: background_image,
        rating,
        genres,
        platforms
    }
    return game
}

function formatVideos (video) {
    return (
        video.map( v => {
            const { id, name, image, generos, plataformas, rating } = v.dataValues
            return {
                id,
                name,
                image,
                rating: Number(rating),
                genres: generos,
                platforms: plataformas
            }
        })
    )
}

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
                        let game = dataProcessor(data)
                        games.push(game);
                        index++;
                    }
                })
            }
            else {
                let count = 0;
                let url = `https://api.rawg.io/api/games?page_size=40&key=${API_KEY}`;
                while( count < cant && cant < 101 ) {
                    await fetch(url)
                    .then(result => result.json())
                    .then( async data => {
                        index=0;
                        while( count < cant && index < 40 ){
                            let game = dataProcessor(data)
                            games.push(game);
                            index++
                            count++;
                        }
                        url = data.next;
                    })
                }
                let video = await Videogame.findAll({
                    include: [ { model: Genero }, { model: Plataforma } ]
                })
                video = formatVideos(video)
                video.map( v => {
                    games.push(v)
                })
            }
            res.status(200).json(games);
        } 
        else {
            await fetch(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
                .then(result => result.json())
                .then( async data => {
                    const count = data.results.length;
                    const video = await Videogame.findAll({
                        where: { name }
                    })
                    if( count || video.length ) {
                        index=0;
                        while( index < count && index < 15 ){
                            const { id, background_image, name, genres, rating } = data.results[index];
                            const game = {
                                id,
                                name,
                                image: background_image,
                                rating,
                                genres
                            }
                            games.push(game);
                            index++
                        }
                        if( games.length < 15) {
                            let video = await Videogame.findAll({
                                where: { name },
                                include: [ { model: Genero }, { model: Plataforma } ],
                                limit: 15 - games.length
                            })
                            video = formatVideos(video)
                            games = games.concat(video)
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