import sys

import fake_rpi
sys.modules['RPi'] = fake_rpi.RPi
sys.modules['RPi.GPIO'] = fake_rpi.RPi.GPIO # Fake GPIO

import RPi.GPIO as GPIO
from time import sleep

def SetupGPIOs(stations):
    GPIO.setmode(GPIO.BCM)
    for station in stations:
        GPIO.setup(station['gpio'], GPIO.OUT)
        print(f"Station {station['gpio']} set to GPIO.OUT")

def WaterNow(gpio, time):
    try:
        GPIO.output(24, 1)
    except KeyboardInterrupt:
        GPIO.cleanup()

def StopAllWater(stations):
    try:
        for station in stations:
            GPIO.output(station['gpio'], 0)
    except KeyboardInterrupt:
        GPIO.cleanup()
