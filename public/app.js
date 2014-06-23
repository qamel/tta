window.onload = function() {

    var console = document.getElementById("console");
    var socket = io.connect(window.location.hostname);
    var playerName;
    var playerToken;

    var playerHand = [];
    var deviceDeck = [
        { name: 'Device 1', resources: 'Chronoton + Wool', description: '+1 to Resource Die', type: 'Passive', count: '2' },
        { name: 'Device 2', resources: 'Chronoton + Food', description: 'Draw extra resources', type: 'Passive', count: '2' },
        { name: 'Device 3', resources: 'Chronoton + People', description: 'Tools do not discard after use.', type: 'Passive', count: '2' },
        { name: 'Device 4', resources: 'Chronoton + Fuel', description: 'Gain one more action per turn', type: 'Passive', count: '2' },
        { name: 'Device 5', resources: 'Chronoton + Plastic', description: 'If you draw a card as an action you may take the top card from the device discard pile', type: 'Passive', count: '2' },
        { name: 'Device 6', resources: 'Chronoton + Gold', description: 'Rotate ring random ring randomly', type: 'Trap', count: '4' },
        { name: 'Device 7', resources: 'Chronoton + Rubber', description: 'Time Travel other player', type: 'Trap', count: '4' },
        { name: 'Device 8', resources: 'Chronoton + Scrap Metal', description: 'Discard a resource', type: 'Trap', count: '4' },
        { name: 'Device 9', resources: 'Chronoton + Chemicals', description: 'Discard a device card (either in hand or on board as passive)', type: 'Trap', count: '4' },
        { name: 'Device 10', resources: 'Chronoton + Water', description: 'Makes a player discard a tool', type: 'Trap', count: '4' },
        { name: 'Device 11', resources: 'Chronoton + Wood', description: 'Block obstacle', type: 'Trap', count: '4' }
    ];



    /* *************************************
     *             Player Joins Game       *
     * *********************************** */

    //<span class="glyphicon glyphicon-star" style="font-size:24px"></span>

    $("#joinGameButton").click(function(){
        playerName = $("#playerNameInput").val();
        socket.emit('playerJoinsGame', { name: playerName });
    });

    socket.on('playerJoinsGame', function (data) {
        if (data) {
            log(data.name + " has joined the game.");
        } else {
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
    });


    /* *************************************
     *             Device Cards            *
     * *********************************** */

     //DRAWING
    $("#drawDeviceCard").click(function(){
        socket.emit('playerDrawsDeviceCard', { player: playerName });
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
     *             Die Rolls               *
     * *********************************** */

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
     *             Dynamic Events          *
     * *********************************** */

    //Give buttons onclick event
    $("#myCardsTable").on("click", '.discardButton', function(e) {
        alert("This works");
    });

    // $("#myCardsTable").on("mouseover", 'tr', function(e) {
    //     alert("This works");
    // });

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
                        }
                    });
                    propertyCell.attr('data-original-title', tooltipText);
                }
            });

            //Create Buttons
            var discardButton = $('<button type="button" class="btn btn-default discardButton"><span class="glyphicon glyphicon-trash"></span></button>');
            var giveButton = $('<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-transfer"></span></button>');
            var activateButton = $('<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-download"></span></button>');

            //Add buttons for modification
            $('<td>').append(discardButton).appendTo(tr);
            $('<td>').append(giveButton).appendTo(tr);

            if (card.type == "Device")
            {  
                $('<td>').append(activateButton).appendTo(tr);  
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
}