import json

stations_file = 'stations.json'

class Station(object):
    def __init__(self, id, location, image_location = None):
        self.id = id
        self.location = location
        self.image_location = image_location

    def __str__(self):
        return f"Station(id={self.id}, location={self.location}, image_locations={self.image_location})"

def GetAllStationsAsJSON():
    with open(stations_file, encoding = 'utf-8') as json_file:
        return json.load(json_file)

def GetAllStations():
    with open(stations_file) as json_file:
        data = json.load(json_file)
        stations = []
        for station_json in data['stations']:
            # polygons = []
            # polygon = []
            # for i in range(len(station_json['polygons'])):
            #     polygon.append((station_json['polygons'][i], station_json['polygons'][i]))
            station = Station(station_json['id'], station_json['location'])
            stations.append(station)
        return stations

if __name__ == "__main__":
    GetAllStations()
    print(GetAllStations()[0])