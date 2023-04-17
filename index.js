import express from 'express';
import cors from 'cors';
import AnimeStreamingRoute from './routes/animeStreamingRoute.js';

const app = express()
const developmentURL    = "http://localhost:3000";
const productionURL     = "https://oneeku.vercel.app";
const corsOptions = {
    origin : productionURL,
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.listen(5000, () => console.log("Server is running..."));

// Routes
app.get('/', (req, res) => {
    res.send("Server is running...")
})
app.use(AnimeStreamingRoute)