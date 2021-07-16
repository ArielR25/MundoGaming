require('dotenv').config();
const { Router } = require('express');
const router = Router();
const fetch = require('node-fetch');
const {API_KEY} = process.env;
const { Plataforma } = require ('../db.js');

const bdLocalPlat = [
    {id:1, name:'Xbox One'},{id:3, name:'iOS'},{id:4, name:'PC'},{id:5, name:'macOS'},{id:6, name:'Linux'},
    {id:7, name:'Nintendo Switch'},{id:8, name:'Nintendo 3DS'},{id:9, name:'Nintendo DS'},{id:10, name:'Wii U'},{id:11, name:'Wii'},
    
    {id:12, name:'Neo Geo'},{id:13, name:'Nintendo DSi'},{id:14, name:'Xbox 360'},{id:15, name:'PlayStation 2'},{id:16, name:'PlayStation 3'},
    {id:17, name:'PSP'},{id:18, name:'PlayStation 4'},{id:19, name:'PS Vita'},{id:21, name:'Android'},{id:22, name:'Atari Flashback'},

    {id:23, name:'Atari 2600'},{id:24, name:'Game Boy Advance'},{id:25, name:'Atari 8-bit'},{id:26, name:'Game Boy'},{id:27, name:'PlayStation'},
    {id:28, name:'Atari 7800'},{id:31, name:'Atari 5200'},{id:34, name:'Atari ST'},{id:41, name:'Apple II'},{id:43, name:'Game Boy Color'},

    {id:46, name:'Atari Lynx'},{id:49, name:'NES'},{id:50, name:'Atari XEGS'},{id:55, name:'Classic Macintosh'},{id:74, name:'SEGA Master System'},
    {id:77, name:'Game Gear'},{id:79, name:'SNES'},{id:80, name:'Xbox'},{id:83, name:'Nintendo 64'},{id:105, name:'GameCube'},

    {id:106, name:'Dreamcast'},{id:107, name:'SEGA Saturn'},{id:111, name:'3DO'},{id:112, name:'Jaguar'},{id:117, name:'SEGA 32X'},
    {id:119, name:'SEGA CD'},{id:166, name:'Commodore / Amiga'},{id:167, name:'Genesis'},{id:186, name:'Xbox Series S/X'},{id:187, name:'PlayStation 5'}
]

router.get('/plataformas', async (req, res) => {
    try{
        
        //carga desde: bdLocalPlat:
        bdLocalPlat.map(pl => {
            Plataforma.findOrCreate({
                where: {
                    id: pl.id,
                    name: pl.name
                }
            })
        })

        // //carga desde la api:
        // await fetch(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
        //     .then( response => response.json())
        //     .then( data => {
        //         const plats = data.results
        //         plats.map(pl => {
        //             Plataforma.findOrCreate({
        //                 where: {
        //                     ID: pl.id,
        //                     name: pl.name
        //                 }
        //             })
        //         })
        //     })
        
            return res.sendStatus(200)
    }catch(e){
        return res.status(400).json(e)
    }
})

module.exports = router;