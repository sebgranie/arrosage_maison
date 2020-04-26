from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS

from station import Station, GetAllStations, GetAllStationsAsJSON
from program import Program, GetAllPrograms, GetAllProgramsAsJSON

class StationsAPI(Resource):
    def get(self):
        return GetAllStationsAsJSON()

class ProgramsAPI(Resource):
    def get(self):
        return GetAllProgramsAsJSON()

if __name__ == "__main__":

    app = Flask(__name__)
    api = Api(app)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

    stations = GetAllStations()

    api.add_resource(StationsAPI, '/api/stations/')
    api.add_resource(ProgramsAPI, '/api/programs/')

    app.run(debug=True)