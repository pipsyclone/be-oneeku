import cheerio from 'cheerio';
import axios from 'axios';

const baseURL =  'https://oploverz.best';
// const baseURL =  'https://15.235.11.45';

function convertText (text) {
    return text.toLowerCase().replace(/\s/g, '-') // Kode tersebut adalah spasi diganti dengan -
}

// get HTML
async function getHTML (linkTambahan) {
    const { data: html } = await axios.get(baseURL + linkTambahan)
    return html;
}

// Process
export const genreList = (req, res) => {
    getHTML('/anime/list-mode/')
    .then((response) => {
        const $ = cheerio.load(response)
        const genreList = []

        $('.c4 li').each((i, element) => {
            const type  = $(element).find('input').attr('name').slice(0, -2);
            const genre = $(element).find('label').text();
            const slug  = convertText(genre);

            genreList.push({
                type, slug, genre
            })
        })

        res.send({status: 200, msg: "OK", data : genreList})
    })
    .catch((error) => {
        res.send({status: 500, msg: error.message})
    })
}

export const popularAnime = (req, res) => {
    getHTML('')
    .then((response) => {
        const $ = cheerio.load(response)
        const popular = []

        $('.listupd .excstf article').slice(0, 4).each((i, element) => {
            const slug     = $(element).find('.bsx a').attr('href').slice(22, -1);
            const title    = $(element).find('.bsx a .limit .egghead .eggtitle').text();
            const type     = $(element).find('.bsx a .limit .egghead .eggtype').text();
            const status   = $(element).find('.bsx a .limit .status').text();
            const episode  = $(element).find('.bsx a .limit .egghead .eggepisode').text().slice(8);
            const imgURL   = $(element).find('.bsx a .limit img').attr('src');

            popular.push({
                slug, title, type, status, episode, imgURL
            })
        })

        res.send({status: 200, msg: "OK", data : popular})
    })
    .catch((error) => {
        res.send({status: 500, msg: error.message})
    })
}

export const animeByGenre = (req, res) => {
    if (req.params.page >= 1) {
        getHTML(`/genres/${req.params.genre}/page/${req.params.page}/`)
        .then((response) => {
            const $ = cheerio.load(response)
            const animeByGenre = []

            $('.listupd article').each((i, element) => {
                const slug     = $(element).find('.bsx a').attr('href').slice(28, -1);
                const title    = $(element).find('.bsx a .tt h2').text();
                const type     = $(element).find('.bsx a .limit .typez').text();
                const status   = $(element).find('.bsx a .limit .status').text();
                const imgURL   = $(element).find('.bsx a .limit img').attr('src');

                animeByGenre.push({
                    slug, title, type, status, imgURL
                })
            })

            res.send({status: 200, msg: "OK", data : animeByGenre, page: parseInt(req.params.page)})
        })
        .catch((error) => {
            res.send({status: 500, msg: "Page reached!"})
        })
    }else {
        res.send({status: 500, msg: "Invalid page!"})
    }
}

export const searchAnime = (req, res) => {
    getHTML(`/?s=${req.params.keyword}`)
    .then((response) => {
        const $ = cheerio.load(response)
        const search = []

        $('.listupd article').each((i, element) => {
            const slug     = $(element).find('.bsx a').attr('href').slice(28, -1);
            const title    = $(element).find('.bsx a .tt h2').text();
            const type     = $(element).find('.bsx a .limit .typez').text();
            const status   = $(element).find('.bsx a .limit .bt .epx').text();
            const imgURL   = $(element).find('.bsx a .limit img').attr('src');

            search.push({
                slug, title, type, status, imgURL
            })
        })

        if (search.length === 0) {
            res.send({status: 404, msg: "Result not found!"})
        }else {
            res.send({status: 200, msg: "OK", data : search})
        }
    })
    .catch((error) => {
        res.send({status: 500, msg: error.message})
    })
}

export const viewAnime = (req, res) => {
    getHTML(`/anime/${req.params.animetitle}/`)
    .then((response) => {
        const $ = cheerio.load(response)
        const viewAnime   = []
        const info        = []
        const genres      = []
        const epsList     = []

        const slug        = req.params.animetitle;
        const title       = $('.animefull .nobigcv .infox .entry-title').text();
        const rating      = parseFloat($('.animefull .nobigcv .thumbook .rt .rating strong').text().slice(7));
        const imgURL      = $('.animefull .nobigcv .thumbook .thumb img').attr('src');
        const description = $('.synp .entry-content p').text();

        $('.animefull .nobigcv .infox .ninfo .info-content .spe span').each((i, element) => {
            const infos   = $(element).text();
            info.push(infos)
        })

        $('.animefull .nobigcv .infox .ninfo .info-content .genxed a').each((i, element) => {
            const genre     = $(element).text();
            const genreSlug = convertText(genre);
            genres.push({ genreSlug, genre })
        })

        $('.epcheck .eplister ul li').each((i, element) => {
            const epsSlug  = $(element).find('a').attr('href').slice(22, -1);
            const epsNum   = parseInt($(element).find('a .epl-num').text());
            const epsTitle = $(element).find('a .epl-title').text();
            const epsDate  = $(element).find('a .epl-date').text();
            epsList.push({
                epsSlug, epsNum, epsTitle, epsDate
            })
        })

        viewAnime.push({
            slug, title, rating, imgURL, description, info, genres, epsList
        })

        if (viewAnime.length === 0) {
            res.send({status: 404, msg: "Result not found!"})
        }else {
            res.send({status: 200, msg: "OK", data : viewAnime})
        }
    })
    .catch((error) => {
        res.send({status: 500, msg: error.message})
    })
}

export const newEpisodes = (req, res) => {
    getHTML('')
    .then((response) => {
        const $ = cheerio.load(response)
        const newEps = []

        $('.listupd .excstf article').slice(4).each((i, element) => {
            const slug     = $(element).find('.bsx .thumb a').attr('href').slice(22, -1);
            const title    = $(element).find('.bsx .inf h2 a').text();
            const type     = $(element).find('.bsx .thumb a .typez').text();
            const rating   = parseFloat($(element).find('.bsx .upscore .scr').text());
            const episode  = $(element).find('.bsx .thumb a .bt .epx').text().slice(3);
            const imgURL   = $(element).find('.bsx .thumb a img').attr('src');

            newEps.push({
                slug, title, type, rating, episode, imgURL
            })
        })

        res.send({status: 200, msg: "OK", data : newEps})
    })
    .catch((error) => {
        res.send({status: 500, msg: error.message})
    })
}

export const watchAnime = (req, res) => {
    getHTML(`/${req.params.animetitle}/`)
    .then((response) => {
        const $ = cheerio.load(response)
        const watchAnime = []
        const slug       = $('.megavid .mvelement .naveps .nvsc a').attr('href').slice(28, -1);
        const series     = $('.single-info .infox .infolimit h2').text();
        const title      = $('.megavid .mvelement .item .lm .title-section .entry-title').text();
        const released   = $('.megavid .mvelement .item .lm .year .updated').text();
        const vidURL     = $('.video-content .lowvid .player-embed iframe').attr('src');
        const prevEps    = $('.megavid .mvelement .naveps .nvs [rel=prev]').attr('href');
        const nextEps    = $('.megavid .mvelement .naveps .nvs [rel=next]').attr('href');

        if (!nextEps && !prevEps) {
            watchAnime.push({
                slug, series, title, released, vidURL, prev: false, next: false
            })
        }else if (!nextEps) {
            const prev   = $('.megavid .mvelement .naveps .nvs [rel=prev]').attr('href').slice(22, -1);
            watchAnime.push({
                slug, series, title, released, vidURL, prev, next: false
            })
        }else if (!prevEps) {
            const next   = $('.megavid .mvelement .naveps .nvs [rel=next]').attr('href').slice(22, -1);
            watchAnime.push({
                slug, series, title, released, vidURL, prev: false, next
            })
        }else {
            const prev   = $('.megavid .mvelement .naveps .nvs [rel=prev]').attr('href').slice(22, -1);
            const next   = $('.megavid .mvelement .naveps .nvs [rel=next]').attr('href').slice(22, -1);
            watchAnime.push({
                slug, series, title, released, vidURL, prev, next
            })
        }

        res.send({status: 200, msg: "OK", data : watchAnime}) 
    })
    .catch((error) => {
        res.send({status: 500, msg: error.message})
    })
}