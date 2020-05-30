import sys
import os
import platform
import json

if platform.system() == "Windows" or os.uname().nodename != "raspberrypi":
  import fake_rpi
  sys.modules['RPi'] = fake_rpi.RPi
  sys.modules['RPi.GPIO'] = fake_rpi.RPi.GPIO # Fake GPIO

import RPi.GPIO as GPIO
from time import sleep

from station import GetAllStationsAsJSON
from events import GetTimestampInMinutesFromNow

live_water_file = 'live_water.json'

def GetLiveWaterScheduleAsJSON():
    try:
        with open(live_water_file) as json_file:
            return json.load(json_file)
    except:
        WriteLiveWaterAsJSONToFile(BuildEmptyLiveWaterDeadlines())

def WriteLiveWaterAsJSONToFile(live_water):
    with open(live_water_file, 'w') as json_file:
        json.dump(live_water, json_file)

def BuildEmptyLiveWaterDeadlines():
    live_water = {}
    live_water['deadlines']= []
    return live_water

def SetupGPIOs():
    stations = GetAllStationsAsJSON()['stations']
    if not len(stations):
        print("Error: no station list provided")
        return

    # Let's make sure the live water schedule is valid
    live_water = GetLiveWaterScheduleAsJSON()
    if live_water is None or "deadlines" not in live_water:
        print("\nERROR: Missing deadlines key in live water json file\n")
        live_water = BuildEmptyLiveWaterDeadlines()

    GPIO.setmode(GPIO.BCM)

    stations = GetAllStationsAsJSON()['stations']
    for station in stations:
        GPIO.setup(station['gpio'], GPIO.OUT)
        print(f"Station {station['gpio']} set to GPIO.OUT")

    # Saving water state (all off)
    WriteLiveWaterAsJSONToFile(live_water)

def PollAllGPIOs():
    stations = GetAllStationsAsJSON()['stations']
    if not len(stations):
        print("Error: no station list provided")
        return

    all_gpio_status = []
    for station in stations:
        gpio_status = {}
        gpio_status['id'] = int(station['id'])
        gpio_status['gpio'] = bool(GPIO.input(station['gpio']))
        all_gpio_status.append(gpio_status)
        # print(f"Station {station['gpio']} set to GPIO.OUT")
    return all_gpio_status

def WaterNow(id: int, minutes: int):
    # We can only water 1 station at a time. We'll first stop all stations
    # before starting a new one
    StopAllWater()

    stations = GetAllStationsAsJSON()['stations']
    if id <= 0 or id > len(stations):
        print(f"Id: {id} is out of range. Won't water now.")
        return

    # Let's make sure the live water schedule is empty
    live_water = GetLiveWaterScheduleAsJSON()
    if live_water is None or "deadlines" not in live_water:
        print("Error: Missing deadlines key in live water json file")
        live_water = BuildEmptyLiveWaterDeadlines()
    if minutes < 1 or minutes > 20:
        print("Error: Asking for watering time outside of bounds [1min, 20min].")
        return
    try:
        GPIO.output(stations[id-1]['gpio'], GPIO.HIGH)
        deadline = {}
        deadline['id'] = id
        deadline['end_timestamp'] = GetTimestampInMinutesFromNow(minutes)
        live_water['deadlines'].append(deadline)
        print(f"Started to water station {id} for {minutes} minutes.")
        WriteLiveWaterAsJSONToFile(live_water)
    except KeyboardInterrupt:
        GPIO.cleanup()

def StopAllWater():
    stations = GetAllStationsAsJSON()['stations']
    if not len(stations):
        print("Error: no station list provided")
        return

    try:
        GPIO.setmode(GPIO.BCM)
        for station in stations:
            GPIO.setup(station['gpio'], GPIO.OUT)
            GPIO.output(station['gpio'], GPIO.LOW)
        WriteLiveWaterAsJSONToFile(BuildEmptyLiveWaterDeadlines())
    except KeyboardInterrupt:
        GPIO.cleanup()


if __name__ == "__main__":
    SetupGPIOs()
