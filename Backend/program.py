import json

programs_file = 'programs.json'

class Program(object):
    def __init__(self):
        self.jours_semaine = []

class ProgramManager():
    def __init__(self, programs):
      self.programs = programs

    def __del__(self):
        pass
        # SaveProgramsToJson(self.programs)

def GetAllProgramsAsJSON():
    with open(programs_file) as json_file:
        return json.load(json_file)

def GetAllPrograms():
    with open(programs_file) as json_file:
        data = json.load(json_file)
        programs = []
        for programs_json in data['programs']:
          pass
        return programs

if __name__ == "__main__":
    print(GetAllProgramsAsJSON())