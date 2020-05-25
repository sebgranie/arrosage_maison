import json

programs_file = 'programs.json'

def GetAllProgramsAsJSON():
    with open(programs_file) as json_file:
        return json.load(json_file)

def WriteProgramsAsJSONToFile(programs):
    with open(programs_file, 'w') as json_file:
        json.dump(programs, json_file)

if __name__ == "__main__":
    print(GetAllProgramsAsJSON())