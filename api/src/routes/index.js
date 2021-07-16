const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const get_videogames = require ('./get_videogames.js');
const get_genres = require ('./get_genres.js');
const get_videogame = require ('./get_videogame.js');
const post_videogame = require ('./post_videogame.js');
const get_plataformas = require ('./get_plataformas.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', get_videogames);
router.use('/', get_genres);
router.use('/', get_videogame);
router.use('/', post_videogame);
router.use('/', get_plataformas);

module.exports = router;
