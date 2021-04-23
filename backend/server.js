const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3030;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Get the first page player. 
app.get('/player', async (req, res) => {
    let file = await fetch('https://www.balldontlie.io/api/v1/players');
    let json = await file.json();
    console.log(json);
    res.send(json);
})

// Get the player based on the search in the endpoint
app.get('/player/:name', async (req, res) => {
    let name = req.params.name;
    let file = await fetch('https://www.balldontlie.io/api/v1/players?search=' + name);
    let json = await file.json();
    console.log(json);
    res.send(json);
})


// get the specific player based on the id with the endpoint
app.get('/player:id', async (req, res) => {
    let id = req.params.id;
    console.log(id);
    let file = await fetch('https://www.balldontlie.io/api/v1/players/' + id);
    let json = await file.json();
    console.log(json);
    res.send(json);
})

// get the player with the id input
app.post('/get-player', async (req, res) => {
    let id = req.body.id;
    let file = await fetch('https://www.balldontlie.io/api/v1/players/' + id);
    let json = await file.json();
    console.log(json);
    res.send(json);
})


// get a player with the name input
app.post('/get-playerName', async (req, res) => {
    let name = req.body.name;
    let file = await fetch('https://www.balldontlie.io/api/v1/players?search=' + name);
    let json = await file.json();
    console.log(json);
    res.send(json);
})

// Listen to the port 3030
app.listen(port, () => {
    console.log('listening on *:3030')
})