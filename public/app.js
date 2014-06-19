window.onload = function() {

    var player = {
        mySocketId: '',
        playerName: ''
    }

    var console = document.getElementById("console");

    function log(stringValue) {
        console.innerHTML = stringValue + "<br/>" + console.innerHTML;
    };

    //var messages = [];
    var socket = io.connect(window.location.hostname);
    //var field = document.getElementById("field");
    //var sendButton = document.getElementById("button");
    //var sendButton2 = document.getElementById("button2");
    //var sendButton3 = document.getElementById("button3");
    //var sendButton4 = document.getElementById("button4");
    //var sendButton5 = document.getElementById("button5");
    //var sendButton6 = document.getElementById("button6");
    var joinGameButton = document.getElementById("joinGameButton");
    var playerName = document.getElementById("playerName");
    //var content = document.getElementById("content");

    socket.on('playerRotatesRing', function (data) {
        if (data) {
            console.log("inrotates ring", data);
            //messages.push(data.message);
            //var html = data.ring + ' ' + data.degrees;
            //content.innerHTML = html;

            chart.series[data.ring].update({
                startAngle: data.degrees
            });

        } else {
            console.log("There is a problem:", data);
        }

    });

    socket.on('playerJoinsGame', function (data) {
        if (data) {
            log(data.name + " has joined the game.");
        } else {
            console.log("There is a problem:", data);
        }
    })

    socket.on('resourceData', function (data) {
        if (data) {

            var tbody = $('#playerResourcesTable tbody'),
                props = ["name", "water", "wood", "wool", "food", "people", "gold", "scrap_metal", "fuel", "rubber", "chemicals", "plastic", "chronotons"];
            // $.each(data, function(i, playerResources) {
            //   var tr = $('<tr>');
            //   $.each(props, function(i, prop) {
            //     $('<th>').html(prop).appendTo(tr);  
            //     $('<td>').html(playerResources[prop]).appendTo(tr);  
            //   });
            //   tbody.append(tr);
            // });

            $.each(props, function(i, prop) {
                var tr = $('<tr>');
                var capitalized = prop.charAt(0).toUpperCase() + prop.substring(1);
                if (capitalized == "Scrap_metal")
                {
                    capitalized = "Scrap Metal";
                }
                $('<th>').html(capitalized).appendTo(tr);  
                $.each(data, function(i, playerResources) {
                    $('<td>').html(playerResources[prop]).appendTo(tr);  
                });
                tbody.append(tr);
            });

            //var index;
            //for (index = 0; index < data.length; ++index){
            //    log(data[index].name + " has " + data[index].wood + " wood!");
            //}
        } else {
            console.log("There is a problem:", data);
        }
    })

    joinGameButton.onclick = function(){
        socket.emit('playerJoinsGame', { name: playerName.value });
    }

    // sendButton.onclick = function() {
    //     var currentAngle = chart.series[0].options.startAngle;
    //     var currentAngle = currentAngle + 15;
    //     if (currentAngle > 359)
    //     {
    //             currentAngle = 0;
    //     }

    //     socket.emit('playerRotatesRing', { ring: 0, degrees: currentAngle });
    //     socket.emit('playerRotatesRing', { ring: 1, degrees: currentAngle });
    // }

    // sendButton2.onclick = function() {
    //     var currentAngle = chart.series[2].options.startAngle;
    //     var currentAngle = currentAngle + 15;
    //     if (currentAngle > 359)
    //     {
    //             currentAngle = 0;
    //     }

    //     socket.emit('playerRotatesRing', { ring: 2, degrees: currentAngle });
    // }

    // sendButton3.onclick = function() {
    //     var currentAngle = chart.series[3].options.startAngle;
    //     var currentAngle = currentAngle + 15;
    //     if (currentAngle > 359)
    //     {
    //             currentAngle = 0;
    //     }

    //     socket.emit('playerRotatesRing', { ring: 3, degrees: currentAngle });
    // }

    // sendButton4.onclick = function() {
    //     var currentAngle = chart.series[4].options.startAngle;
    //     var currentAngle = currentAngle + 30;
    //     if (currentAngle > 359)
    //     {
    //             currentAngle = 0;
    //     }

    //     socket.emit('playerRotatesRing', { ring: 4, degrees: currentAngle });
    // }

    // sendButton5.onclick = function() {
    //     var currentAngle = chart.series[5].options.startAngle;
    //     var currentAngle = currentAngle + 60;
    //     if (currentAngle > 359)
    //     {
    //             currentAngle = 0;
    //     }

    //     socket.emit('playerRotatesRing', { ring: 5, degrees: currentAngle });
    // }

    // sendButton6.onclick = function() {
    //     var currentAngle = chart.series[6].options.startAngle;
    //     var currentAngle = currentAngle + 120;
    //     if (currentAngle > 359)
    //     {
    //             currentAngle = 0;
    //     }

    //     socket.emit('playerRotatesRing', { ring: 6, degrees: currentAngle });
    // }
}