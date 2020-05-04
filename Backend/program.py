import json

programs_file = 'programs.json'

class Program(object):
    def __init__(self):
        pass

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