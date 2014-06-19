var io;
var gameSocket;
var playerData = [];

/**
 * This function is called by index.js to initialize a new game instance.
 *
 * @param sio The Socket.IO library
 * @param socket The socket object for the connected client.
 */
exports.initGame = function(sio, socket){
    io = sio;
    gameSocket = socket;
    gameSocket.emit('connected', { message: "You are connected!" });

    // Host Events
    //gameSocket.on('hostCreateNewGame', hostCreateNewGame);
    //gameSocket.on('hostRoomFull', hostPrepareGame);
    //gameSocket.on('hostCountdownFinished', hostStartGame);
    //gameSocket.on('hostNextRound', hostNextRound);

    // Player Events
    //gameSocket.on('playerJoinGame', playerJoinGame);
    //gameSocket.on('playerAnswer', playerAnswer);
    gameSocket.on('playerRotatesRing', playerRotatesRing);
    gameSocket.on('playerJoinsGame', playerJoinsGame);
    console.log("Game inited");
}


/* *****************************
   *                           *
   *     PLAYER FUNCTIONS      *
   *                           *
   ***************************** */

/**
 * The game is over, and a player has clicked a button to restart the game.
 * @param data
 */
function playerRotatesRing(data) {
    // console.log('Player: ' + data.playerName + ' ready for new game.');

    // Emit the player's data back to the clients in the game room.
    console.log("smitting ring data");
    io.sockets.emit('playerRotatesRing', data);
}

function playerJoinsGame(data) {
    // console.log('Player: ' + data.playerName + ' ready for new game.');

    // Emit the player's data back to the clients in the game room.
    console.log("player joins game: " + data.name);

    playerData.push({ name: data.name, water: 0, wood: 0, wool: 0, food: 0, people: 0, gold: 0, scrap_metal: 0, fuel: 0, rubber: 0, chemicals: 0, plastic: 0, chronotons: 0 });

    io.sockets.emit('playerJoinsGame', data);
    io.sockets.emit('resourceData', playerData);
}