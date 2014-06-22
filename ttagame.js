var io;
var gameSocket;
var playerData = [];
var playerLocations = [];
/*var timeEraMapping = [
    { position : 0, time : 0 },
    { position : 1, time : 100 },
    { position : 2, time : 200 },
    { position : 3, time : 300 },
    { position : 4, time : 400 },
    { position : 5, time : 500 },
    { position : 6, time : 600 },
    { position : 7, time : 700 },
    { position : 8, time : 800 },
    { position : 9, time : 900 },
    { position : 10, time : 1000 },
    { position : 11, time : 1100 },
    { position : 12, time : 1200 },
    { position : 13, time : 1300 },
    { position : 14, time : 1400 },
    { position : 15, time : 1500 },
    { position : 16, time : 1600 },
    { position : 17, time : 1700 },
    { position : 18, time : 1800 },
    { position : 19, time : 1900 },
    { position : 20, time : 2000 },
    { position : 21, time : 2100 },
    { position : 22, time : 2200 },
    { position : 23, time : 2300 }
];

var timeEraOffset = 0;*/

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
    console.log("Game inited");
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

   /* if (data.ring == 0)
    {
        if (data.degrees > 0)
        {
            timeEraOffset = timeEraOffset + 1;
        }
        else
        {
            timeEraOffset = timeEraOffset - 1;
        }

        console.log("timeoffset: " + timeEraOffset);

        if (timeEraOffset == 24)
        {
            timeEraOffset = 0;
        }

        //Player rotated time ring, so determine position mapping to time mapping
        if (data.degrees > 0)
        {
            //Rotated clockwise
            var previousTime = 'null';
            for (var i = 0; i < timeEraMapping.length; i++)
            {
                if (previousTime == 'null')
                {
                    //First time through loop
                    previousTime = timeEraMapping[i].time;
                }
                else
                {
                    var thisTime = timeEraMapping[i].time;
                    timeEraMapping[i].time = previousTime;
                    previousTime = thisTime;
                }
            }

            timeEraMapping[0].time = previousTime;
        }
        else
        {
            //Rotated counter clockwise
            var previousTime = 'null';
            for (var i = timeEraMapping.length - 1; i < 0; i--)
            {
                if (previousTime == 'null')
                {
                    //First time through loop
                    previousTime = timeEraMapping[i].time;
                }
                else
                {
                    var thisTime = timeEraMapping[i].time;
                    timeEraMapping[i].time = previousTime;
                    previousTime = thisTime;
                }
            }

            timeEraMapping[timeEraMapping.length - 1].time = previousTime;
        }
    }*/


    io.sockets.emit('playerRotatesRing', data);
}

function playerJoinsGame(data) {
    // console.log('Player: ' + data.playerName + ' ready for new game.');

    // Emit the player's data back to the clients in the game room.
    console.log("player joins game: " + data.name);

    playerData.push({ name: data.name, water: 0, wood: 0, wool: 0, food: 0, people: 0, gold: 0, scrap_metal: 0, fuel: 0, rubber: 0, chemicals: 0, plastic: 0, chronotons: 0 });
    playerLocations.push({ name: data.name, position: 0 });


    io.sockets.emit('playerJoinsGame', data);
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