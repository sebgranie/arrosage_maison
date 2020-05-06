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

    def post(self):
        programs = GetAllProgramsAsJSON()

        parser.add_argument('name', type=str, help='New program doesn\'t have a name')
        parser.add_argument('days', help='Can\'t decode days of the week')
        args = parser.parse_args()

        program = {}
        program['name'] = args['name']
        program['days'] = args['days']
        programs['programs'].append(program)
        print(programs)

    def delete(self, program_id):
        program_manager = GetProgramManager()
        program_manager.DeleteProgramById(program_id)

if __name__ == "__main__":

    app = Flask(__name__)
    api = Api(app)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    parser = reqparse.RequestParser()

    stations = GetAllStations()

    api.add_resource(StationsAPI, '/api/stations/')
    api.add_resource(ProgramsAPI, '/api/programs')

    app.run(debug=True)