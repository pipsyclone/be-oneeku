import cheerio from 'cheerio';
import axios from 'axios';

const baseURL =  'https://animerock.net';

// get HTML
async function getHTML (linkTambahan) {
    const { data: html } = await axios.get(baseURL + linkTambahan)
    return html;
}

// Process
export const genreList = (req, res) => {
    getHTML('')
    .then((response) => {
        const $ = cheerio.load(response)
        const genres = []
        
        $('.table-responsive table tbody tr td .bgm-bluegray').each((i, element) => {
            const genre = $(element).text().slice(1, -1);
            genres.push({
                genre
            })
        })

        res.send({status: 200, msg: "OK", data: genres})
    })
    .catch((error) => {
        res.send({status: 500, msg: error.message})
    })
}

export const animeByGenre = (req, res) => {
    if (req.params.page > 1) {
        getHTML(`/genre/${req.params.genre}/${req.params.page}`)
        .then((response) => {
            const $ = cheerio.load(response)
            const animeByGenreData = []

            $('.card-padding .row div .p-relative .home_link').each((i, element) => {
                const epsLink       = $(element).attr('href').slice(28);
                const animeTitle    = $(element).attr('title');
                const imgURL        = $(element).find('div').attr('data-src');
                const status        = $(element).find('.bgm-indigo').text().slice(1, -1);
                const type          = $(element).find('.bgm-red').text().slice(1, -1);

                if (status === "") {
                    animeByGenreData.push({
                        epsLink, animeTitle, imgURL, status: "Tamat", type
                    })
                }else {
                    animeByGenreData.push({
                        epsLink, animeTitle, imgURL, status, type
                    })
                }
            })
            res.send({status: 200, msg: "OK", data: animeByGenreData})
        })
        .catch((error) => {
            res.send({status: 500, msg: error.message})
        })
    }else {
        getHTML(`/genre/${req.params.genre}`)
        .then((response) => {
            const $ = cheerio.load(response)
            const animeByGenreData = []

            $('.card-padding .row div .p-relative .home_link').each((i, element) => {
                const epsLink       = $(element).attr('href').slice(28);
                const animeTitle    = $(element).attr('title');
                const imgURL        = $(element).find('div').attr('data-src');
                const status        = $(element).find('.bgm-indigo').text().slice(1, -1);
                const type          = $(element).find('.bgm-red').text().slice(1, -1);

                if (status === "") {
                    animeByGenreData.push({
                        epsLink, animeTitle, imgURL, status: "Tamat", type
                    })
                }else {
                    animeByGenreData.push({
                        epsLink, animeTitle, imgURL, status, type
                    })
                }
            })
            res.send({status: 200, msg: "OK", data: animeByGenreData})
        })
        .catch((error) => {
            res.send({status: 500, msg: error.message})
        })
    }
}

export const recomendations = (req, res) => {
    getHTML('')
    .then((response) => {
        const $ = cheerio.load(response)
        const recomendationsAnime = [];

        $('.lazy-container table tbody tr td .home_link').each((i, element) => {
            const epsLink    = $(element).attr('href').slice(28);
            const animeTitle = $(element).find('[style=background:rgba(0,0,0,0.6);]').text();
            const imgURL     = $(element).find('.thumbnail').attr('data-src');
            recomendationsAnime.push({
                epsLink, animeTitle, imgURL
            })
        })

        res.send({status: 200, msg: "OK", data: recomendationsAnime})
    })
    .catch((error) => {
        res.send({status: 500, msg: error.message})
    })
}

export const popular = (req, res) => {
    if (req.params.page > 1) {
        getHTML(`/popular/${req.params.page}`)
        .then((response) => {
            const $ = cheerio.load(response)
            const popularData = []

            $('.card-padding .row div .p-relative .home_link').each((i, element) => {
                const epsLink       = $(element).attr('href').slice(28);
                const animeTitle    = $(element).attr('title');
                const imgURL        = $(element).find('div').attr('data-src');
                const status        = $(element).find('.bgm-indigo').text().slice(1, -1);
                const type          = $(element).find('.bgm-red').text().slice(1, -1);

                if (status === "") {
                    popularData.push({
                        epsLink, animeTitle, imgURL, status: "Tamat", type
                    })
                }else {
                    popularData.push({
                        epsLink, animeTitle, imgURL, status, type
                    })
                }
            })

            res.send({status: 200, msg: "OK", data: popularData})
        })
        .catch((error) => {
            res.send({status: 500, msg: error.message})
        })
    }else {
        getHTML('/popular')
        .then((response) => {
            const $ = cheerio.load(response)
            const popularData = []

            $('.card-padding .row div .p-relative .home_link').each((i, element) => {
                const epsLink       = $(element).attr('href').slice(28);
                const animeTitle    = $(element).attr('title');
                const imgURL        = $(element).find('div').attr('data-src');
                const status        = $(element).find('.bgm-indigo').text().slice(1, -1);
                const type          = $(element).find('.bgm-red').text().slice(1, -1);

                if (status === "") {
                    popularData.push({
                        epsLink, animeTitle, imgURL, status: "Tamat", type
                    })
                }else {
                    popularData.push({
                        epsLink, animeTitle, imgURL, status, type
                    })
                }
            })

            res.send({status: 200, msg: "OK", data: popularData})
        })
        .catch((error) => {
            res.send({status: 500, msg: error.message})
        })
    }
}

export const newEpisodes = (req, res) => {
    getHTML('')
        .then((response) => {
            const $ = cheerio.load(response)
            const newEpisodeData = []

            $('.card-padding .row div .p-relative .home_link').each((i, element) => {
                const epsLink       = $(element).attr('href').slice(28);
                const animeTitle    = $(element).attr('title');
                const imgURL        = $(element).find('div').attr('data-src');
                const status        = $(element).find('.bgm-indigo').text().slice(1, -1);
                const type          = $(element).find('.bgm-red').text().slice(1, -1);

                if (status === "") {
                    newEpisodeData.push({
                        epsLink, animeTitle, imgURL, status: "Tamat", type
                    })
                }else {
                    newEpisodeData.push({
                        epsLink, animeTitle, imgURL, status, type
                    })
                }
            })

            res.send({status: 200, msg: "OK", data: newEpisodeData})
        })
        .catch((error) => {
            res.send({status: 500, msg: error.message})
        })
}

export const search = (req, res) => {
    if (req.params.page > 1) {
        getHTML(`/search/${req.params.keyword}/${req.params.page}`)
        .then((response) => {
            const $ = cheerio.load(response)
            const searchData = []

            $('.card-padding .row div .p-relative .home_link').each((i, element) => {
                const epsLink       = $(element).attr('href').slice(28);
                const animeTitle    = $(element).attr('title');
                const imgURL        = $(element).find('div').attr('data-src');
                const status        = $(element).find('.bgm-indigo').text().slice(1, -1);
                const type          = $(element).find('.bgm-red').text().slice(1, -1);

                if (status === "") {
                    searchData.push({
                        epsLink, animeTitle, imgURL, status: "Tamat", type
                    })
                }else {
                    searchData.push({
                        epsLink, animeTitle, imgURL, status, type
                    })
                }
            })
            res.send({status: 200, msg: "OK", data: searchData})
        })
        .catch((error) => {
            res.send({status: 500, msg: error.message})
        })
    }else {
        getHTML(`/search/${req.params.keyword}`)
        .then((response) => {
            const $ = cheerio.load(response)
            const searchData = []

            $('.card-padding .row div .p-relative .home_link').each((i, element) => {
                const epsLink       = $(element).attr('href').slice(28);
                const animeTitle    = $(element).attr('title');
                const imgURL        = $(element).find('div').attr('data-src');
                const status        = $(element).find('.bgm-indigo').text().slice(1, -1);
                const type          = $(element).find('.bgm-red').text().slice(1, -1);

                if (status === "") {
                    searchData.push({
                        epsLink, animeTitle, imgURL, status: "Tamat", type
                    })
                }else {
                    searchData.push({
                        epsLink, animeTitle, imgURL, status, type
                    })
                }
            })
            res.send({status: 200, msg: "OK", data: searchData})
        })
        .catch((error) => {
            res.send({status: 500, msg: error.message})
        })
    }
}

export const watchAnime = (req, res) => {
    getHTML(`/video/${req.params.animeslug}/${req.params.episode}`)
    .then((response) => {
        const $ = cheerio.load(response)
        const watchData  = []
        const prevNext   = []
        const genres     = []

        const animeSlug  = $('.card-padding .row div img').attr('src').slice(33, -4);
        const animeTitle = $('.card-header h1 [itemprop=partOfTVSeries] [itemprop=name]').text();
        const episode    = parseInt($('.card-header h1 [itemprop=episodeNumber]').text().slice(8));
        const imgURL     = $('.card-padding .row div img').attr('src');
        const videoURL   = $('.card-padding .row .player-aspect-ratio iframe').attr('src');
        const description= $('.card-padding .row div p').text();

        $('.card-padding .row .btn-primary').each((i, element) => {
            const link = $(element).attr('href').slice(28);
            prevNext.push({
                link
            })
        })

        $('.card-padding .row div .bgm-green').each((i, element) => {
            const genre  = $(element).text();
            genres.push({
                genre
            })
        })
        
        watchData.push({
            animeSlug, animeTitle, episode, imgURL, videoURL, prevNext, description, genres
        })

        res.send({status: 200, msg: "OK", data : watchData})
    })
    .catch((error) => {
        res.send({status: 500, msg: error.message})
    })
}