# GeoLoc Demo

#Requirements:
    - Python2/3 : https://www.python.org
    - Flask - simple rest microservice framework : http://flask.pocoo.org/
    - Flask-Socketio : https://pypi.org/project/Flask-SocketIO/
    - D3.js & Datamaps : https://datamaps.github.io/ 
    - SocketIO js : https://socket.io/

#Installation :
$pip install Flask
$pip install flask-socketio

#Design:
    - Frontend : 
        > Using D3&Datamaps to draw world map 
        > Using socketio to duplex communication with Backend
    - Backend :
        > Using Flask to load js/html/css
        > Using Flask to handle submit data
        > Using Flask-Socketio to communicate with Frontend

