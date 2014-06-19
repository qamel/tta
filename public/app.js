window.onload = function() {
    //var messages = [];
    var socket = io.connect(window.location.hostname);
    //var field = document.getElementById("field");
    var sendButton = document.getElementById("button");
    var sendButton2 = document.getElementById("button2");
    var sendButton3 = document.getElementById("button3");
    var sendButton4 = document.getElementById("button4");
    var sendButton5 = document.getElementById("button5");
    var sendButton6 = document.getElementById("button6");
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

    sendButton.onclick = function() {
        var currentAngle = chart.series[0].options.startAngle;
        var currentAngle = currentAngle + 15;
        if (currentAngle > 359)
        {
                currentAngle = 0;
        }

        socket.emit('playerRotatesRing', { ring: 0, degrees: currentAngle });
        socket.emit('playerRotatesRing', { ring: 1, degrees: currentAngle });
    }

    sendButton2.onclick = function() {
        var currentAngle = chart.series[2].options.startAngle;
        var currentAngle = currentAngle + 15;
        if (currentAngle > 359)
        {
                currentAngle = 0;
        }

        socket.emit('playerRotatesRing', { ring: 2, degrees: currentAngle });
    }

    sendButton3.onclick = function() {
        var currentAngle = chart.series[3].options.startAngle;
        var currentAngle = currentAngle + 15;
        if (currentAngle > 359)
        {
                currentAngle = 0;
        }

        socket.emit('playerRotatesRing', { ring: 3, degrees: currentAngle });
    }

    sendButton4.onclick = function() {
        var currentAngle = chart.series[4].options.startAngle;
        var currentAngle = currentAngle + 30;
        if (currentAngle > 359)
        {
                currentAngle = 0;
        }

        socket.emit('playerRotatesRing', { ring: 4, degrees: currentAngle });
    }

    sendButton5.onclick = function() {
        var currentAngle = chart.series[5].options.startAngle;
        var currentAngle = currentAngle + 60;
        if (currentAngle > 359)
        {
                currentAngle = 0;
        }

        socket.emit('playerRotatesRing', { ring: 5, degrees: currentAngle });
    }

    sendButton6.onclick = function() {
        var currentAngle = chart.series[6].options.startAngle;
        var currentAngle = currentAngle + 120;
        if (currentAngle > 359)
        {
                currentAngle = 0;
        }

        socket.emit('playerRotatesRing', { ring: 6, degrees: currentAngle });
    }
}