import sys
import os
import platform


if platform.system() == "Windows" or os.uname().nodename != "raspberrypi":
  import fake_rpi
  sys.modules['RPi'] = fake_rpi.RPi
  sys.modules['RPi.GPIO'] = fake_rpi.RPi.GPIO # Fake GPIO

import RPi.GPIO as GPIO
from time import sleep


def SetupGPIOs(stations):
    if not len(stations):
        print("Error: no station list provided")
        return

    GPIO.setmode(GPIO.BCM)
    for station in stations:
        GPIO.setup(station['gpio'], GPIO.OUT)
        print(f"Station {station['gpio']} set to GPIO.OUT")

def PollAllGPIOs(stations):
    if not len(stations):
        print("Error: no station list provided")
        return

    all_gpio_status = []
    for station in stations:
        gpio_status = {}
        gpio_status['id'] = int(station['id'])
        gpio_status['gpio'] = GPIO.input(station['gpio'])
        all_gpio_status.append(gpio_status)
        # print(f"Station {station['gpio']} set to GPIO.OUT")
    return all_gpio_status

def WaterNow(stations, id, time):
    # We can only water 1 station at a time. We'll first stop all stations
    # before starting a new one
    StopAllWater(stations)

    if id <= 0 or id > len(stations):
        print(f"Id: {id} is out of range. Won't water now.")
        return

    try:
        GPIO.output(stations[id-1]['gpio'], GPIO.HIGH)
    except KeyboardInterrupt:
        GPIO.cleanup()

def StopAllWater(stations):
    if not len(stations):
        print("Error: no station list provided")
        return

    try:
        for station in stations:
            GPIO.output(station['gpio'], GPIO.LOW)
    except KeyboardInterrupt:
        GPIO.cleanup()
