var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function () {
    console.log("-------------Connected-----------");
    socket.emit('connected', { data: 'Connected!' });
});

socket.on('response', function (msg) {
    console.log("-------------Received-----------");
    console.log(JSON.stringify(msg));
    draw(msg.data);
});

function send() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "submit", true);
    xhttp.send(new FormData(document.getElementById("form")));
    console.log("-------------Sent-----------");
    // location = document.getElementById('map').value;
    // console.log("sent : " + location);
    socket.emit('connected', { data: 'Refresh!' });
    // e.preventDefault();
    // return false;
}

function refresh() {
    console.log("-------------Sent-----------");
    socket.emit('connected', { data: 'Refresh!' });
}

function draw(locationDataArray) {
    document.getElementById("map").innerHTML = "";
    var map = new Datamap({
        scope: 'world',
        element: document.getElementById('map'),
        projection: 'mercator',
        height: 900,
        fills: {
            defaultFill: '#f0af0a',
            lt50: 'rgba(0,244,244,0.9)',
            gt50: 'red'
        },

        //country highlight
        data: {
            USA: { fillKey: 'lt50' },
            RUS: { fillKey: 'lt50' },
            CAN: { fillKey: 'lt50' },
            BRA: { fillKey: 'gt50' },
            ARG: { fillKey: 'gt50' },
            COL: { fillKey: 'gt50' },
            AUS: { fillKey: 'gt50' },
            ZAF: { fillKey: 'gt50' },
            MAD: { fillKey: 'gt50' }
        }
    })

    map.bubbles(
        locationDataArray.filter(function (row) {
            return parseInt(row.hour) >= parseInt(document.getElementById('lasthour').value);
        })
        , {
            popupTemplate: function (geo, data) {
                return "<div class='hoverinfo'>It is " + data.name + "</div>";
            }
        });
}