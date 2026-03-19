import express from 'express';
const planets = (await import('npm-solarsystem')).default;
import fetch from 'node-fetch';

const app = express()
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get('/', async(req, res) => {
    let url = "https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=solar%20system"
    let response = await fetch(url);
    let data = await response.json();
    let randomIndex = Math.floor(Math.random() * 50);
    let image = data.hits[randomIndex].webformatURL;
    // we cannot have multiple objects
    res.render('home.ejs', {image})
})

app.get('/planetInfo', (req, res) => {
    let planet = req.query.planet;
    let planetInfo = planets[`get${planet}`]();
    res.render('planet.ejs', {planetInfo, planet})
})

app.get('/comets', (req, res) => {
    let cometsInfo = planets.getComets();
    // console.log(cometsInfo);
    res.render('comets.ejs', {cometsInfo})
})

app.get('/asteroids', (req, res) => {
    let asteroidsInfo = planets.getAsteroids();
    // console.log(asteroidsInfo);
    res.render('asteroids.ejs', {asteroidsInfo})
})

app.get('/nasa_pod', async(req, res) => {
    let url = "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&"
    let response = await fetch(url);
    let nasa_data = await response.json();
    // console.log(nasa_data);
    res.render('nasa_pod.ejs', {nasa_data})
})



// app.get('/mercury', (req, res) => {
//     let mercuryInfo = planets.getMercury();
//     console.log(mercuryInfo);
//     res.render('mercury.ejs', {mercuryInfo})
// })

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})