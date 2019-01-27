from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
# app.debug = True
socketio = SocketIO(app)
data = [
       {"name": 'Point 1', "latitude": 21.32, "longitude": 5.32, "radius": 10, "fillKey": 'gt50', "hour": 1},
       {"name": 'Point 2', "latitude": -25.32, "longitude": 120.32, "radius": 10, "fillKey": 'lt50', "hour": 5},
       {"name": 'Point 3', "latitude": 21.32, "longitude": -84.32, "radius": 10, "fillKey": 'gt50', "hour": 7}
       ]
@app.route("/")
def index():
    return render_template('index.html')

@app.route("/submit", methods=['POST'])
def submit():
    print(" ---------------Request--------------")
    print(str(request))
    data.append({"name": request.form['name'], "latitude": request.form['latitude'], "longitude": request.form['longitude'], "radius": request.form['radius'], "fillKey": request.form['fillKey'], "hour": request.form["hour"]})
    # emit('response', {'data': data})
    socketio.emit('response', {'data': data})
    # socketio.send('response')
    return "Success"

@socketio.on('connected')
def handle_message(message):
    print('received message: ' + str(message))
    print(" ---------------Response--------------")
    print(str(data))
    socketio.emit('response', {'data': data})

if __name__ == "__main__":
    socketio.run(app)