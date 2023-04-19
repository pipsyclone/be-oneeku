import express from 'express';
// import {  genreList, popularAnime, animeByGenre, searchAnime, viewAnime, newEpisodes, watchAnime } from "../controllers/animeStreamingControll.js";
import { watchAnime } from '../controllers/animeStreamingControll.js';

const route = express.Router()

// route.get('/genres', genreList)
// route.get('/popular', popularAnime)
// route.get('/anime-by-genre/:genre/:page', animeByGenre)
// route.get('/search/:keyword', searchAnime)
// route.get('/view/:animetitle', viewAnime)
// route.get('/new-episodes', newEpisodes)
route.get('/watch', watchAnime)

export default route;