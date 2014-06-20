window.onload = function() {

    var console = document.getElementById("console");

    function log(stringValue) {
        console.innerHTML = stringValue + "<br/>" + console.innerHTML;
    };

    var socket = io.connect(window.location.hostname);
    var playerName;
    var playerToken;

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

    /* *************************************
     *             Time Movement           *
     * *********************************** */

    socket.on('timeMovement', function (data) {
        if (data) {
            


        } else {
            log("There was a problem moving in time.");
        }
    });


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
}