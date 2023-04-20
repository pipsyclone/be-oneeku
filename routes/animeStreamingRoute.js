import express from 'express';
import { 
    genreList,
    animeByGenre,
    recomendations,
    popular,
    newEpisodes,
    search,
    watchAnime
} from '../controllers/animeStreamingControll.js';

const route = express.Router()

route.get('/genres', genreList)
route.get('/anime-by-genre/:genre/:page', animeByGenre)
route.get('/recomendation', recomendations)
route.get('/popular/:page', popular)
route.get('/new-episodes', newEpisodes)
route.get('/search/:keyword/:page', search)
route.get('/watch/:animeslug/:episode', watchAnime)

export default route;