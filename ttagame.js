var io;
var gameSocket;
var playerData = [];
var playerLocations = [];
var deviceDeck = [
     'Device 1', 'Device 1', 'Device 2', 'Device 2', 'Device 3', 'Device 3', 'Device 4', 'Device 4', 'Device 5', 'Device 5',
     'Device 6', 'Device 6', 'Device 6', 'Device 6', 'Device 7', 'Device 7', 'Device 7', 'Device 7',
     'Device 8', 'Device 8', 'Device 8', 'Device 8', 'Device 9', 'Device 9', 'Device 9', 'Device 9',
     'Device 10', 'Device 10', 'Device 10', 'Device 10', 'Device 11', 'Device 11', 'Device 11', 'Device 11'
];
var paradoxDeck = [
     'Paradox 1', 'Paradox 2', 'Paradox 3', 'Paradox 4', 'Paradox 5', 'Paradox 6', 'Paradox 7', 'Paradox 8',
     'Paradox 9', 'Paradox 10', 'Paradox 11'
];
var activeParadoxes = [];
var activeDevices = [];
var discardDeviceDeck = [];
var discardParadoxDeck = [];
var players = [];
var artifactId;
var doomValue = 3;


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
    gameSocket.on('resourceModify', playerModifiesResource);
    gameSocket.on('consoleMessage', consoleMessage);
    gameSocket.on('playerMoves', playerMoves);
    gameSocket.on('playerDrawsDeviceCard', playerDrawsDeviceCard);
    gameSocket.on('playerDiscardsDeviceCard', playerDiscardsDeviceCard);
    gameSocket.on('playerGivesCard', playerGivesCard);
    gameSocket.on('playerActivatesDevice', playerActivatesDevice);
    gameSocket.on('playerDiscardsActiveDeviceCard', playerDiscardsActiveDeviceCard);
    gameSocket.on('playerAddsBlockToken', playerAddsBlockToken);
    gameSocket.on('playerAddsParadoxToken', playerAddsParadoxToken);
    gameSocket.on('playerRemovesBlockToken', playerRemovesBlockToken);
    gameSocket.on('playerRemovesParadoxToken', playerRemovesParadoxToken);
    gameSocket.on('playerChecksForArtifact', playerChecksForArtifact);
    gameSocket.on('playerDrawsParadoxCard', playerDrawsParadoxCard);
    gameSocket.on('playerDiscardsParadoxCard', playerDiscardsParadoxCard);
    gameSocket.on('playerChangesParadoxSeverity', playerChangesParadoxSeverity);
    gameSocket.on('doomValueChanged', doomValueChanged);

    console.log("Game inited");

    artifactId = Math.floor((Math.random() * 3) + 1);
    console.log("Artifact id is " + artifactId);

    //Shuffle device and paradox deck
    shuffle(deviceDeck);
    shuffle(paradoxDeck);
}


/* *****************************
   *                           *
   *     PLAYER FUNCTIONS      *
   *                           *
   ***************************** */

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
    playerLocations.push({ name: data.name, position: 0 });
    players.push(data.name);

    io.sockets.emit('playerJoinsGame', players);
    io.sockets.emit('resourceData', playerData);
    io.sockets.emit('playerMoves', playerLocations);
}

function playerModifiesResource(data) {
    console.log("player " + data.name + " adds " + data.count + " of " + data.type);

    for (var i = 0; i < playerData.length; i++)
    {
        if (data.name == playerData[i].name)
        {
            playerData[i][data.type] = playerData[i][data.type] + data.count;
        }
    }

    io.sockets.emit('resourceData', playerData);
}

function consoleMessage(data) {
    console.log(data.message);
    io.sockets.emit('consoleMessage', data);
}

function playerMoves(data) {


/*    var position = -1;
    for (var i = 0; i < timeEraMapping.length; i++)
    {
        if (data.time == timeEraMapping[i].time)
        {
            position = timeEraMapping[i].position + timeEraOffset;
        }
    }

*/
    console.log("time: " + data.time + "  ringAngle: " + data.ringAngle);
    

    if (data.ringAngle == 0)
    {
        position = data.time / 100;
    }
    else 
    {
        position = (data.ringAngle / 15) + (data.time / 100);
    }

    if (position > 23)
    {
        position = position % 24;
    }

    for (var i = 0; i < playerLocations.length; i++)
    {
        if (data.name == playerLocations[i].name)
        {

            playerLocations[i]['position'] = position;
        }
    }

    console.log(data.name + " moving to position " + position);
    io.sockets.emit('playerMoves', playerLocations);
}

function playerDrawsDeviceCard(data) {

    if (deviceDeck.length == 0)
    {
        //No cards left in device deck, so shuffle the discard into the main device
        console.log("shuffling devices from discard");

        for (var i = 0; i < discardDeviceDeck.length; i++)
        {
            var card = discardDeviceDeck.shift();
            deviceDeck.push(card);
        }

        shuffle(deviceDeck);
        //DOESN'T WORK YET
        //deviceDeck = $.extend(true, [], discardDeviceDeck);
        //discardDeviceDeck = [];
    }

    var card = deviceDeck.shift();
    var player = data.player;

    var drawnCard = ({ player: player, card: card });
    console.log(player + " draws " + card);
    io.sockets.emit('playerDrawsDeviceCard', drawnCard);
}

function playerDiscardsDeviceCard(data) {
    console.log("player discarded " + data.name);
    discardDeviceDeck.push(data.name);
}

function playerGivesCard(data) {
    console.log(data.fromPlayer + " gave " + data.name + " to " + data.toPlayer);
    io.sockets.emit('playerGivesCard', data);
}

function playerActivatesDevice(data) {
    console.log(data.player + " activates " + data.name);
    activeDevices.push({ card: data.name, player: data.player });
    io.sockets.emit('playerActivatesDevice', activeDevices);
}

function playerDiscardsActiveDeviceCard(data) {
    var card = activeDevices[data.cardId];
    console.log(data.player + " discarded active " + card.card);
    consoleMessage({ message: data.player + " discarded active " + card.card });

    //Remove card from active devices
    activeDevices.splice(data.cardId, 1);

    //Add to discard
    discardDeviceDeck.push(card.card);

    //Essentially refresh the activated table client-side
    io.sockets.emit('playerActivatesDevice', activeDevices);
}

function playerAddsBlockToken(data) {
    io.sockets.emit('playerAddsBlockToken', data);
}

function playerAddsParadoxToken(data) {
    io.sockets.emit('playerAddsParadoxToken', data);
}

function playerRemovesBlockToken(data) {
    io.sockets.emit('playerRemovesBlockToken', data);
}

function playerRemovesParadoxToken(data) {
    io.sockets.emit('playerRemovesParadoxToken', data);
}

function playerChecksForArtifact(data) {
    if (data.artifactId == artifactId)
    {
        //io.sockets.emit('playerChecksForArtifact', { result: 'success' });
        consoleMessage({ message: data.player + " found the Artifact!" });
    }
    else
    {
        //io.sockets.emit('playerChecksForArtifact', { result: 'fail' });
        consoleMessage({ message: data.player + " searched and did not find the Artifact..." });
    }
}

function playerDrawsParadoxCard(data) {

    if (paradoxDeck.length == 0)
    {
        //No cards left in paradox deck, so shuffle the discard into the main deck
        console.log("shuffling paradoxes from discard");

        for (var i = 0; i < discardParadoxDeck.length; i++)
        {
            var card = discardParadoxDeck.shift();
            paradoxDeck.push(card); 
        }

        shuffle(paradoxDeck);
    }

    var card = paradoxDeck.shift();
    var player = data.player;

    activeParadoxes.push({ player: player, card: card, severity: 1 });

    console.log(player + " draws " + card);
    io.sockets.emit('playerDrawsParadoxCard', activeParadoxes);
}


function playerDiscardsParadoxCard(data) {
    var card = activeParadoxes[data.cardId];
    console.log(data.player + " discarded paradox " + card.card);
    consoleMessage({ message: data.player + " discarded paradox " + card.card });

    //Remove card from active devices
    activeParadoxes.splice(data.cardId, 1);

    //Add to discard
    discardParadoxDeck.push(card.card);

    //Essentially refresh the activated table client-side
    io.sockets.emit('playerDrawsParadoxCard', activeParadoxes);
}

function playerChangesParadoxSeverity(data) {
    activeParadoxes[data.cardId].severity = data.toSeverity;
    console.log(data.player + " changed sevverity of paradox " + activeParadoxes[data.cardId].card + " to " + data.toSeverity);
    consoleMessage({ message: data.player + " changed sevverity of paradox " + activeParadoxes[data.cardId].card + " to " + data.toSeverity });

    //Essentially refresh the activated table client-side
    io.sockets.emit('playerDrawsParadoxCard', activeParadoxes);
}

function doomValueChanged(data) {
    doomValue = doomValue + data.change;
    console.log(data.player + " changed doom to " + doomValue);
    consoleMessage({ message: data.player + " changed doom to " + doomValue });

    io.sockets.emit('doomValueChanged', doomValue);
}


/* *****************************
   *                           *
   *     HELPER FUNCTIONS      *
   *                           *
   ***************************** */

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};