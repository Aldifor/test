$(document).ready(function () {
    var socket = new WebSocket("wss://echo.websocket.org");
    var status = $("#status");
    
    console.log(socket);
    
    socket.onopen = function() {
        status.html("cоединение установлено<br>");
    };

    socket.onclose = function(event) {
        if (event.wasClean) {
            status.html('cоединение закрыто');
        } else {
            status.html('соединения как-то закрыто');
        }
        status.append('<br>код: ' + event.code + ' причина: ' + event.reason);
    };

    socket.onmessage = function(event) {
        let message = JSON.parse(event.data);    
        status.append(`пришли данные: <b>${message.name}</b>: ${message.msg}<br>`);
    };

    socket.onerror = function(event) {
        status.html("ошибка " + event.message);
    };
    $('form').submit(function(){
        var message = {
            name: this.fname.value,
            msg:  this.msg.value
        }
        $('input[type=text]').val('');
        socket.send(JSON.stringify(message));
        return false;
    })
        

});