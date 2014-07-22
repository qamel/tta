window.onload = function() {

    var console = document.getElementById("console");
    var socket = io.connect(window.location.hostname);
    var playerName;
    var playerToken;
    var players = [];

    var playerHand = [];
    var deviceDeck = [
        { name: 'Device 1', resources: 'Chronoton + Wool', description: '+1 to Resource Die', type: 'Passive', count: '2' },
        { name: 'Device 2', resources: 'Chronoton + Food', description: 'As an action, you may gather resources a second time in a turn.  This may be a different resource from the first gathering', type: 'Passive', count: '2' },
        { name: 'Device 3', resources: 'Chronoton + People', description: 'Tools do not discard after use.', type: 'Passive', count: '2' },
        { name: 'Device 4', resources: 'Chronoton + Fuel', description: 'Gain one more action per turn', type: 'Passive', count: '2' },
        { name: 'Device 5', resources: 'Chronoton + Plastic', description: 'As an action you may take a card from another players hand (their choice)', type: 'Passive', count: '2' },
        { name: 'Device 6', resources: 'Chronoton + Gold', description: 'Rotate a random ring randomly', type: 'Trap', count: '4' },
        { name: 'Device 7', resources: 'Chronoton + Rubber', description: 'Time Travel any player to the time of era of your choosing.', type: 'Trap', count: '4' },
        { name: 'Device 8', resources: 'Chronoton + Scrap Metal', description: 'Player discards X resources based on die roll of that players choosing', type: 'Trap', count: '4' },
        { name: 'Device 9', resources: 'Chronoton + Chemicals', description: 'Player discards a device card (either in hand or on board as passive) of that players choosing', type: 'Trap', count: '4' },
        { name: 'Device 10', resources: 'Chronoton + Water', description: 'Player discard a tool of that players choosing', type: 'Trap', count: '4' },
        { name: 'Device 11', resources: 'Chronoton + Wood', description: 'Block an obstacle of your choosing.', type: 'Trap', count: '4' }
    ];

    var paradoxDeck = [
        { name: 'Paradox 1', description: 'Gain X less resources', type: 'A', count: '1', s1: '1', s2: '2', s3: '3', s4: '4', removalMechanic: 'X Resources', resources: 'Chemicals' },
        { name: 'Paradox 2', description: 'Can only rotate rings X clicks', type: 'A', count: '1', s1: '6', s2: '4', s3: '2', s4: '0', removalMechanic: 'Blind Bid', resources: 'Chronotons (8)' },
        { name: 'Paradox 3', description: 'Can not X action', type: 'A', count: '1', s1: 'move in time', s2: 'draw device cards', s3: 'craft tools', s4: 'search for artifact', removalMechanic: 'Resources + Die (50%)', resources: 'Wood (5)' },
        { name: 'Paradox 4', description: 'Start of players turn, they discard X resource', type: 'A', count: '1', s1: '1', s2: '2', s3: '3', s4: '4', removalMechanic: 'X Resources', resources: 'People' },
        { name: 'Paradox 5', description: 'Start of players turn, rotate X rings.  Clockwise if even, counter if odd.', type: 'B', count: '1', s1: '1', s2: '2', s3: '3', s4: '4', removalMechanic: 'Blind Bid', resources: 'Gold (6)' },
        { name: 'Paradox 6', description: 'Start of players turn, X paradox tokens appear randomly', type: 'B', count: '1', s1: '1', s2: '2', s3: '3', s4: '4', removalMechanic: 'Resources + Die (50%)', resources: 'Plastic (6)' },
        { name: 'Paradox 7', description: 'When a player rotates a ring, X additional paradox tokens are placed randomly', type: 'B', count: '1', s1: '1', s2: '2', s3: '3', s4: '4', removalMechanic: 'Blind Bid', resources: 'Fuel (7)' },
        { name: 'Paradox 8', description: 'Start of players turn, all players choose X cards from players hand randomly to their right and take them', type: 'B', count: '1', s1: '1', s2: '2', s3: '3', s4: '4', removalMechanic: 'Resources + Die (10%)', resources: 'Wool (2)' },
        { name: 'Paradox 9', description: 'Start of players turn, current player takes X resources from players right', type: 'C', count: '1', s1: '2', s2: '4', s3: '6', s4: '8', removalMechanic: 'Blind Bid', resources: 'Food (8)' },
        { name: 'Paradox 10', description: 'At the start of the round, place X block tokens randomly on the board.', type: 'C', count: '1', s1: '2', s2: '3', s3: '4', s4: '5', removalMechanic: 'X Resources', resources: 'Water' },
        { name: 'Paradox 11', description: 'At the start of a round, add the abilities (card text) of X paradoxes to this card in order of their appearance.  These copied abilities are all severity 1 on this paradox.  If another paradox gets removed that this one had copied an ability from, then the copied ability is removed from this paradox. This paradox can only have copied abilities of paradoxs that are in play.', type: 'C', count: '1', s1: '1', s2: '2', s3: '3', s4: '4', removalMechanic: 'Resources + Die (40%)', resources: 'Rubber(5)' },
        { name: 'Paradox 12', description: 'Crafting tools or devices require X additional resources', type: 'C', count: '1', s1: '1 Gold', s2: '3 Wool', s3: '5 Rubber', s4: '8 Chronotons', removalMechanic: 'X Resources', resources: 'Scrap Metal' },
        { name: 'Paradox 13', description: 'NULL', type: 'ABC', count: 'NULL', s1: 'NULL', s2: 'NULL', s3: 'NULL', s4: 'NULL', removalMechanic: 'Resources', resources: 'One of Each' },
    ];

    /* *************************************
     *             Player Joins Game       *
     * *********************************** */

    //<span class="glyphicon glyphicon-star" style="font-size:24px"></span>

    $("#joinGameButton").click(function(){
        playerName = $("#playerNameInput").val();
        socket.emit('playerJoinsGame', { name: playerName });
        socket.emit('consoleMessage', { message: playerName + ' joined the game.' });
    });

    socket.on('playerJoinsGame', function (data) {
        if (data) {
            //log(data.name + " has joined the game.");

            players = data;

           //log("There was a problem with joining the game.");
        }
        else {
           log("There was a problem with joining the game.");
        }
    });

    /* *************************************
     *             Console Message         *
     * *********************************** */

    socket.on('consoleMessage', function (data) {
        if (data) {
            log(data.message);
        } else {
           log("There was a problem with logging to console.");
        }
    });

    /* *************************************
     *             Resources Update        *
     * *********************************** */

    socket.on('resourceData', function (data) {
        if (data) {

            var tbody = $('#playerResourcesTable tbody'),
                props = ["name", "water", "wood", "wool", "food", "people", "gold", "scrap_metal", "fuel", "rubber", "chemicals", "plastic", "chronotons"];

            $('#playerResourcesTable tbody tr').remove();

            $.each(props, function(i, prop) {
                var tr = $('<tr>');
                var capitalized = prop.charAt(0).toUpperCase() + prop.substring(1);
                if (capitalized == "Scrap_metal")
                {
                    capitalized = "Scrap Metal";
                }

                if (capitalized == "Name")
                {
                    capitalized = "";
                }
                $('<th>').html(capitalized).appendTo(tr);  
                $.each(data, function(i, playerResources) {
                    $('<td>').html(playerResources[prop]).appendTo(tr);  
                });
                tbody.append(tr);
            });

        } else {
            console.log("There is a problem:", data);
        }
    });


    /* *************************************
     *             Resources Add/Remove        *
     * *********************************** */

    $("#addResourceButton").click(function(){
        var resource = $("#resourceModifySelect").val();
        var message = playerName + " added one " + resource + ".";
        socket.emit('consoleMessage', { message: message });
        socket.emit('resourceModify', { name: playerName, type: resource, count: 1 });
    });

    $("#removeResourceButton").click(function(){
        var resource = $("#resourceModifySelect").val();
        var message = playerName + " removed one " + resource + ".";
        socket.emit('consoleMessage', { message: message });
        socket.emit('resourceModify', { name: playerName, type: resource, count: -1 });
    });

    /* *************************************
     *            Ring Rotation            *
     * *********************************** */

    socket.on('playerRotatesRing', function (data) {
        if (data) {
            chart.series[data.ring].update({
                startAngle: data.degrees
            });

        } else {
            console.log("There is a problem:", data);
        }
    });

    
    $("#rotateRingCwButton").click(function(){
        var ringIndex = $( "#timeRingSelect" ).val();

        var addedAngle = 0;
        if (ringIndex == 0)
        {
            addedAngle = 15;
        }
        else if (ringIndex == 2)
        {
            addedAngle = 15;
        }
        else if (ringIndex == 3)
        {
            addedAngle = 15;
        }
        else if (ringIndex == 4)
        {
            addedAngle = 30;
        }
        else if (ringIndex == 5)
        {
            addedAngle = 60;
        }
        else if (ringIndex == 6)
        {
            addedAngle = 120;
        }

        var currentAngle = chart.series[ringIndex].options.startAngle;
        var currentAngle = currentAngle + addedAngle;
        if (currentAngle > 359)
        {
             currentAngle = 0;
        }

        socket.emit('playerRotatesRing', { ring: ringIndex, degrees: currentAngle });

        if (ringIndex == 0)
        {
            //Also rotate the resources ring, if the time ring is rotated
            socket.emit('playerRotatesRing', { ring: 1, degrees: currentAngle });
        }
    });
    
    $("#rotateRingCcwButton").click(function(){
        var ringIndex = $( "#timeRingSelect" ).val();

        var addedAngle = 0;
        if (ringIndex == 0)
        {
            addedAngle = -15;
        }
        else if (ringIndex == 2)
        {
            addedAngle = -15;
        }
        else if (ringIndex == 3)
        {
            addedAngle = -15;
        }
        else if (ringIndex == 4)
        {
            addedAngle = -30;
        }
        else if (ringIndex == 5)
        {
            addedAngle = -60;
        }
        else if (ringIndex == 6)
        {
            addedAngle = -120;
        }

        var currentAngle = chart.series[ringIndex].options.startAngle;

        if (currentAngle < 1)
        {
             currentAngle = 360;
        }

        var currentAngle = currentAngle + addedAngle;


        socket.emit('playerRotatesRing', { ring: ringIndex, degrees: currentAngle });

        if (ringIndex == 0)
        {
            //Also rotate the resources ring, if the time ring is rotated
            socket.emit('playerRotatesRing', { ring: 1, degrees: currentAngle });
        }
    });

    /* *************************************
     *             Time Movement           *
     * *********************************** */

    socket.on('playerMoves', function (data) {
        if (data) {
            //Remove player movement tokens
            $('#playerTokens').find('div').each(function(){
                $(this).html('');
            });        

            //Add player movement tokens
            $.each(data, function(i, playerMove) {
                $('#time' + playerMove.position + 'div').append(playerMove.name);
            });
        } else {
            log("There was a problem moving in time.");
        }
    });

    $("#moveInTimeButton").click(function(){
        var timeEra = $( "#timeEraMoveSelect" ).val();
        socket.emit('playerMoves', { name: playerName, time: timeEra, ringAngle: chart.series[0].options.startAngle });
    });


    /* *************************************
     *             Tool Card               *
     * *********************************** */

    $("#addToolButton").click(function(){
        var tool = $( "#toolAddSelect" ).val();

        //Add tool to player's hand object
        playerHand.push({ card: tool, type: 'Tool' });
        renderCardTable();

        socket.emit('consoleMessage', { message: playerName + ' created a ' + tool + ' tool.' });
    });


    /* *************************************
     *             Device Cards            *
     * *********************************** */

     //DRAWING
    $("#drawDeviceCard").click(function(){
        socket.emit('playerDrawsDeviceCard', { player: playerName });
        socket.emit('consoleMessage', { message: playerName + ' drew a device.' });
    });

    socket.on('playerDrawsDeviceCard', function (data) {
        if (data.player == playerName)
        {
            playerHand.push({ card: data.card, type: 'Device' });
            renderCardTable();
        }
    });

    //DISCARDING
    // $("#drawDeviceCard").click(function(){
    //     socket.emit('playerDiscardsDeviceCard', { player: playerName });
    // });

    /* *************************************
     *             Giving Cards            *
     * *********************************** */

    socket.on('playerGivesCard', function (data) {
        if (data.toPlayer == playerName)
        {
            playerHand.push({ card: data.name, type: data.type });
            renderCardTable();
        }
    });

    /* *************************************
     *             Activate Cards          *
     * *********************************** */

    socket.on('playerActivatesDevice', function (data) {
        //Render active devices table with data
        renderActiveDeviceTable(data);
    });

    /* *************************************
     *             Die Rolls               *
     * *********************************** */

    $("#rolld4Button").click(function(){
        var roll = Math.floor((Math.random() * 4) + 1);
        var message = playerName + " rolled d4 : " + roll;
        socket.emit('consoleMessage', { message: message });
    });


    $("#rolld6Button").click(function(){
        var roll = Math.floor((Math.random() * 6) + 1);
        var message = playerName + " rolled d6 : " + roll;
        socket.emit('consoleMessage', { message: message });
    });

    $("#rolld10Button").click(function(){
        var roll = Math.floor((Math.random() * 10) + 1);
        var message = playerName + " rolled d10 : " + roll;
        socket.emit('consoleMessage', { message: message });
    });

    $("#rolld24Button").click(function(){
        var roll = Math.floor((Math.random() * 24) + 1);
        var message = playerName + " rolled d24 : " + roll;
        socket.emit('consoleMessage', { message: message });
    });

    /* *************************************
     *             Block Tokens            *
     * *********************************** */

    $("#addBlockTokenButton").click(function(){
        var selectedPoints = chart.getSelectedPoints();
        if (selectedPoints != null)
        {
            socket.emit('playerAddsBlockToken', { id: selectedPoints[0].id });
            socket.emit('consoleMessage', { message: playerName + ' added a block token.' });
        }
    });

    socket.on('playerAddsBlockToken', function (data) {
        var point = chart.get(data.id);
        var pointName = point.name + '<span class="glyphicon glyphicon-ban-circle" style="font-size:14px; color: red;">';
        point.update({ name: pointName });
    });

    $("#removeBlockTokenButton").click(function(){
        var selectedPoints = chart.getSelectedPoints();
        if (selectedPoints != null)
        {
            socket.emit('playerRemovesBlockToken', { id: selectedPoints[0].id });
            socket.emit('consoleMessage', { message: playerName + ' removed a block token.' });
        }
    });

    socket.on('playerRemovesBlockToken', function (data) {
        var point = chart.get(data.id);
        var pointName = point.name.replace('<span class="glyphicon glyphicon-ban-circle" style="font-size:14px; color: red;">', '');
        point.update({ name: pointName });
    });

    /* *************************************
     *             Paradox Tokens            *
     * *********************************** */

    $("#addParadoxTokenButton").click(function(){
        var selectedPoints = chart.getSelectedPoints();
        if (selectedPoints != null || selectedPoints != undefined)
        {
            socket.emit('playerAddsParadoxToken', { id: selectedPoints[0].id });
            socket.emit('consoleMessage', { message: playerName + ' added a paradox token.' });
        }
    });

    socket.on('playerAddsParadoxToken', function (data) {
        var point = chart.get(data.id);
        var pointName = point.name + '<span class="glyphicon glyphicon-flash" style="font-size:14px; color: yellow;">';
        point.update({ name: pointName });
    });

    $("#removeParadoxTokenButton").click(function(){
        var selectedPoints = chart.getSelectedPoints();
        if (selectedPoints != null)
        {
            socket.emit('playerRemovesParadoxToken', { id: selectedPoints[0].id });
            socket.emit('consoleMessage', { message: playerName + ' removed a paradox token.' });
        }
    });

    socket.on('playerRemovesParadoxToken', function (data) {
        var point = chart.get(data.id);
        var pointName = point.name.replace('<span class="glyphicon glyphicon-flash" style="font-size:14px; color: yellow;">', '');
        point.update({ name: pointName });
    });

    
    /* *************************************
     *          Draw Paradoxes             *
     * *********************************** */

    $("#drawParadoxButton").click(function(){
        socket.emit('playerDrawsParadoxCard', { player: playerName });
        //socket.emit('consoleMessage', { message: playerName + ' drew a paradox.' });
    });

    socket.on('playerDrawsParadoxCard', function (data) {
        renderParadoxTable(data);
    });

    /* *************************************
     *         Check for Artifact          *
     * *********************************** */

    $("#searchArtifactButton").click(function(){
        var artifactId = $( "#artifactSearchSelect" ).val();

        socket.emit('playerChecksForArtifact', { player: playerName, artifactId: artifactId });
    });

    /* *************************************
     *         Doom Manipulation           *
     * *********************************** */

    $("#increaseDoomButton").click(function(){
        socket.emit('doomValueChanged', { player: playerName, change: 1 })
    });

    $("#decreaseDoomButton").click(function(){
        socket.emit('doomValueChanged', { player: playerName, change: -1 })
    });

    socket.on('doomValueChanged', function (data) {
        //Update doom value
        $("#doomCounter").text(data);
    });

    /* *************************************
     *       Dynamic Events - Cards        *
     * *********************************** */

    //Give buttons onclick event
    $("#myCardsTable").on("click", '.discardButton', function(e) {
        var cardId = this.id.replace('discardButton', '');

        //Remove card from hand
        var card = playerHand[cardId];

        if (card.type == "Device")
        {
            //Send it back to the server
            socket.emit('playerDiscardsDeviceCard', { name: card.card });
            socket.emit('consoleMessage', { message: playerName + ' discards ' + card.card });
        }

        playerHand.splice(cardId, 1);

        //Re-render
        renderCardTable();
    });

    $("#myCardsTable").on("click", '.giveButtonLink', function(e) {
        var cardIdAndPlayer = this.id.replace('giveButtonLink', '');
        var index = cardIdAndPlayer.indexOf("_");
        var cardId = cardIdAndPlayer.substring(0, index);
        var toPlayer = cardIdAndPlayer.substring(index + 1);

        //Get card
        var card = playerHand[cardId];

        //Send it to the server
        socket.emit('playerGivesCard', { name: card.card, type: card.type, fromPlayer: playerName, toPlayer: toPlayer });
        socket.emit('consoleMessage', { message: playerName + ' gave a card to ' + toPlayer });

        //Remove card from players hand
        playerHand.splice(cardId, 1);

        //Re-render
        renderCardTable();
    });

    //Active devices
    $("#myCardsTable").on("click", '.activateButton', function(e) {
        var cardId = this.id.replace('activateButton', '');

        //Get card
        var card = playerHand[cardId];

        //Send it back to the server
        socket.emit('playerActivatesDevice', { name: card.card, player: playerName });
        socket.emit('consoleMessage', { message: playerName + ' activates device ' + card.card });
        
        //Remove card from hand
        playerHand.splice(cardId, 1);

        //Re-render
        renderCardTable();
    });

    // $("#myCardsTable").on("mouseover", 'tr', function(e) {
    //     alert("This works");
    // });

    /* *************************************
     *   Dynamic Events - Active Devices   *
     * *********************************** */

    //Give buttons onclick event
    $("#activeDevicesTable").on("click", '.discardButton', function(e) {
        var cardId = this.id.replace('discardButton', '');

        //Send it back to the server
        socket.emit('playerDiscardsActiveDeviceCard', { cardId: cardId, player: playerName });
        //socket.emit('consoleMessage', { message: playerName + ' discards active ' + card.card });
 
    });

    /* *************************************
     *   Dynamic Events - Active Paradoxes   *
     * *********************************** */

    $("#paradoxTable").on("click", '.discardButton', function(e) {
        var cardId = this.id.replace('discardButton', '');

        //Send it back to the server
        socket.emit('playerDiscardsParadoxCard', { cardId: cardId, player: playerName });
        //socket.emit('consoleMessage', { message: playerName + ' discards active ' + card.card });
 
    });

    $("#paradoxTable").on("click", '.severityButtonLink', function(e) {
        var cardIdAndSeverity = this.id.replace('severityButtonLink', '');
        var index = cardIdAndSeverity.indexOf("_");
        var cardId = cardIdAndSeverity.substring(0, index);
        var toSeverity = cardIdAndSeverity.substring(index + 1);

        //Send it back to the server
        socket.emit('playerChangesParadoxSeverity', { cardId: cardId, player: playerName, toSeverity: toSeverity });
        //socket.emit('consoleMessage', { message: playerName + ' discards active ' + card.card });
 
    });

    /* *************************************
     *             Helper Methods          *
     * *********************************** */

    function log(stringValue) {
        console.innerHTML = stringValue + "<br/>" + console.innerHTML;
    };

    function renderCardTable() {
        //Re-render players hand into table
        var tbody = $('#myCardsTable tbody'),
            props = ["card", "type"];

        $('#myCardsTable tbody tr').remove();

        var count = 0;
        $.each(playerHand, function(i, card) {
            var tr = $('<tr>');

            //Add card and type to table
            var deviceType = "";
            $.each(props, function(i, prop) {
                var propertyCell = $('<td data-toggle="tooltip" data-placement="left" data-container="body" data-html="true" style="vertical-align:middle">');

                propertyCell.html(card[prop]).appendTo(tr);  

                if (prop == "card")
                {
                    //Add tooltips
                    var tooltipText = "";
                    $.each(deviceDeck, function(i, device)
                    {
                        if (device.name == card[prop])
                        {
                            tooltipText = "<b>Description:</b> " + device.description;
                            tooltipText = tooltipText + "<br/><b>Resources:</b> " + device.resources;
                            tooltipText = tooltipText + "<br/><b>Type:</b> " + device.type;
                            deviceType = device.type;
                        }
                    });
                    propertyCell.attr('data-original-title', tooltipText);
                }
            });

            //Create give player menu drop down
            var playerDropdown = '<ul class="dropdown-menu" role="menu">';

            $.each(players, function(i, player) {
                if (player != playerName)
                {
                    playerDropdown = playerDropdown + '<li><a class="giveButtonLink" id="giveButtonLink' + count + '_' + player + '" href="#">' + player + '</a></li>';
                }
            })

            playerDropdown = playerDropdown + '</ul>';

            //Create Buttons
            var discardButton = $('<button type="button" class="btn btn-warning discardButton"><span class="glyphicon glyphicon-trash"></span></button>');
            var giveButton = $('<div class="btn-group"><button type="button" class="btn btn-warning giveButton dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-transfer"></span></button>' + playerDropdown + '<div class="btn-group">');
            var activateButton = $('<button type="button" class="btn btn-warning activateButton"><span class="glyphicon glyphicon-download"></span></button>');

            //Add buttons for modification
            $('<td>').append(discardButton).appendTo(tr);
            $('<td>').append(giveButton).appendTo(tr);

            if (card.type == "Device")
            {  
                if (deviceType == "Passive")
                {
                    $('<td>').append(activateButton).appendTo(tr);  
                }
                else
                {
                    //empty td
                    $('<td>').appendTo(tr);  
                }
            }
            else
            {
                //empty td
                 $('<td>').appendTo(tr);  
            }

            //Give buttons ids
            discardButton.attr('id', 'discardButton' + count);
            giveButton.attr('id', 'giveButton' + count);
            activateButton.attr('id', 'activateButton' + count);

            tbody.append(tr);

            count = count + 1;
        });

        $("[data-toggle='tooltip']").tooltip();
    };

    function renderActiveDeviceTable(activeDevices) {
        //Re-render active devices into table
        var tbody = $('#activeDevicesTable tbody'),
            props = ["card", "player"];

        $('#activeDevicesTable tbody tr').remove();

        var count = 0;
        $.each(activeDevices, function(i, card) {
            var tr = $('<tr>');

            //Add card and type to table
            $.each(props, function(i, prop) {
                var propertyCell = $('<td data-toggle="tooltip" data-placement="left" data-container="body" data-html="true" style="vertical-align:middle">');

                propertyCell.html(card[prop]).appendTo(tr);  

                if (prop == "card")
                {
                    //Add tooltips
                    var tooltipText = "";
                    $.each(deviceDeck, function(i, device)
                    {
                        if (device.name == card[prop])
                        {
                            tooltipText = "<b>Description:</b> " + device.description;
                            tooltipText = tooltipText + "<br/><b>Resources:</b> " + device.resources;
                        }
                    });
                    propertyCell.attr('data-original-title', tooltipText);
                }
            });

            //Create Buttons
            var discardButton = $('<button type="button" class="btn btn-warning discardButton"><span class="glyphicon glyphicon-trash"></span></button>');
                        
            //Add buttons for modification
            $('<td>').append(discardButton).appendTo(tr);

            //Give buttons ids
            discardButton.attr('id', 'discardButton' + count);

            tbody.append(tr);

            count = count + 1;

        });

        $("[data-toggle='tooltip']").tooltip();
    };

    function renderParadoxTable(activeParadoxes) {
        //Re-render active devices into table
        var tbody = $('#paradoxTable tbody'),
            props = ["card", "player"];

        $('#paradoxTable tbody tr').remove();

        var count = 0;
        $.each(activeParadoxes, function(i, activeParadox) {
            var tr = $('<tr>');

            //Add card and type to table
            var severityNumeral = "I";
            $.each(props, function(i, prop) {
                var propertyCell = $('<td data-toggle="tooltip" data-placement="left" data-container="body" data-html="true" style="vertical-align:middle">');

                propertyCell.html(activeParadox[prop]).appendTo(tr);  

                if (prop == "card")
                {
                    //Add tooltips
                    var tooltipText = "";
                    $.each(paradoxDeck, function(i, paradox)
                    {
                        if (paradox.name == activeParadox[prop])
                        {
                            //Found paradox card, so create cells for data
                            //propertyCell.html(paradox.type).appendTo(tr);
                            $('<td style="vertical-align:middle">').append(paradox.type).appendTo(tr);

                            var paradoxDescription = paradox.description;
                            if (activeParadox.severity == 1)
                            {
                                paradoxDescription = paradoxDescription.replace('X', paradox.s1);
                                severityNumeral = "I";
                            }
                            else if (activeParadox.severity == 2)
                            {
                                paradoxDescription = paradoxDescription.replace('X', paradox.s2);
                                severityNumeral = "II";
                            }
                            else if (activeParadox.severity == 3)
                            {
                                paradoxDescription = paradoxDescription.replace('X', paradox.s3);
                                severityNumeral = "III";
                            }
                            else if (activeParadox.severity == 4)
                            {
                                paradoxDescription = paradoxDescription.replace('X', paradox.s4);
                                severityNumeral = "IV";
                            }

                            //Set tooltip
                            tooltipText = "<b>Description:</b> " + paradoxDescription;
                            tooltipText = tooltipText + "<br/><b>Removal:</b> " + paradox.removalMechanic;
                            tooltipText = tooltipText + "<br/><b>Resources:</b> " + paradox.resources;

                        }
                    });
                    propertyCell.attr('data-original-title', tooltipText);
                }
            });

            //Create Buttons
            var severityDropdown = '<ul class="dropdown-menu" role="menu">';
            severityDropdown = severityDropdown + '<li><a class="severityButtonLink" id="severityButtonLink' + count + '_1" href="#">I</a></li>';
            severityDropdown = severityDropdown + '<li><a class="severityButtonLink" id="severityButtonLink' + count + '_2" href="#">II</a></li>';
            severityDropdown = severityDropdown + '<li><a class="severityButtonLink" id="severityButtonLink' + count + '_3" href="#">III</a></li>';
            severityDropdown = severityDropdown + '<li><a class="severityButtonLink" id="severityButtonLink' + count + '_4" href="#">IV</a></li>';
            severityDropdown = severityDropdown + '</ul>';
            var severityButton = $('<div class="btn-group"><button type="button" class="btn btn-danger severityButton dropdown-toggle" data-toggle="dropdown">' + severityNumeral +'</button>' + severityDropdown + '<div class="btn-group">');
            var discardButton = $('<button type="button" class="btn btn-danger discardButton"><span class="glyphicon glyphicon-trash"></span></button>');
            
            //Add buttons for modification
            $('<td style="vertical-align:middle">').append(severityButton).appendTo(tr);
            $('<td style="vertical-align:middle">').append(discardButton).appendTo(tr);

            //Give buttons ids
            discardButton.attr('id', 'discardButton' + count);

            tbody.append(tr);

            count = count + 1;

        });

        $("[data-toggle='tooltip']").tooltip();
    };
}