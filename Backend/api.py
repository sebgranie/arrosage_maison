import json
from flask import Flask
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS

from station import Station, GetAllStations, GetAllStationsAsJSON
from program import Program, GetAllPrograms, GetAllProgramsAsJSON, WriteProgramsAsJSONToFile

class StationsAPI(Resource):
    def get(self):
        return GetAllStationsAsJSON()

class ProgramsAPI(Resource):
    def get(self):
        return GetAllProgramsAsJSON()

    def post(self):
        parser.add_argument('name', type=str, required=True, help='New program doesn\'t have a name')
        parser.add_argument('active', type=bool, required=True, help='New program doesn\'t have an active field')
        parser.add_argument('days', action='append', required=True, help='Can\'t decode days of the week')
        parser.add_argument('startTime', required=True, help='Can\'t decode watering start time')
        parser.add_argument('arrosageReseaux', type=str, action='append', required=True, help='Can\'t decode watering networks')
        args = parser.parse_args()

        programs = GetAllProgramsAsJSON()
        program = {}
        program['id'] = len(programs['programs'])+1
        program['name'] = args['name']
        program['active'] = args['active']
        program['days'] = args['days']
        start_time = json.loads(args['startTime'].replace("\'", "\""))
        program['startTime'] = {}
        program['startTime']['hour'] = start_time['hour']
        program['startTime']['minute'] = start_time['minute']
        program['arrosageReseaux'] = []
        for i in args['arrosageReseaux']:
            program['arrosageReseaux'].append(json.loads(i.replace("\'", "\"")))

        programs['programs'].append(program)
        print(programs)
        WriteProgramsAsJSONToFile(programs)

class ProgramsAPI_2(Resource):
    def delete(self, program_id):
        programs = GetAllProgramsAsJSON()
        program_deleted = False
        out_programs = {}
        out_programs['programs'] = []
        for program in programs['programs']:
            if int(program["id"]) != int(program_id):
                out_programs['programs'].append(program)
                program_deleted = True
        WriteProgramsAsJSONToFile(out_programs)

if __name__ == "__main__":

    app = Flask(__name__)
    api = Api(app)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    parser = reqparse.RequestParser()

    stations = GetAllStations()

    api.add_resource(StationsAPI, '/api/stations/')
    api.add_resource(ProgramsAPI, '/api/programs')
    api.add_resource(ProgramsAPI_2, '/api/programs/<program_id>')

    app.run(debug=True)