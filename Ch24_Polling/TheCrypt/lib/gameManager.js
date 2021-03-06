var Game = require('./game');
var PlayerGame = require('./playerGame');
var mapData = require('../maps/theDarkHouse.json');

var games = {};
var playerGames = {};

function getID () {
    var id;
    
    do {
        id = Math.floor(Math.random() * 100000 + 1);
    } while (games[id]);
    
    return id;
}

function getNewGame () {
    var game = new Game(getID(), mapData);
    games[game.id] = game;

    return game;
}

function joinGame (playerName, id) {
    var game = games[id] || getNewGame();
    
    var playerGame = new PlayerGame(playerName, game);
    playerGames[game.id + "_" + playerName] = playerGame;

    return playerGame;
}

function getPlayerGame (playerName, id) {
    return playerGames[id + "_" + playerName];
}

module.exports = {
    join: joinGame,
    getPlayerGame: getPlayerGame
};