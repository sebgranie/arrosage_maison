#!/usr/bin/env python3.7

from datetime import datetime
import time

import water
import station
import events

def GetListOfIdsCurrentlyWatering():
    watering_state = water.PollAllGPIOs()
    if watering_state is None:
        print("Failure")
    active_ids = []
    for i in watering_state:
        if i['gpio']:
            active_ids.append(i['id'])
    return active_ids

def StopWaterForId(id: int):
    print(f"Watering exceeded timestamp, stopping station {id}")
    water.StopAllWater()
    water.WriteLiveWaterAsJSONToFile(water.BuildEmptyLiveWaterDeadlines())

def MaybeStartWatering(timestamp_now: int, events, active_ids):
    for event in events:
        delta = event['timestamp'] - timestamp_now
        if delta < 0 and timestamp_now < (event['timestamp'] + (60 * event['durationMinutes'])):
            if event['id'] not in active_ids:
                water.WaterNow(event['id'], event['durationMinutes'])
                return True
            else:
                print(f"Station {event['id']} is currently watering")
        elif delta <= 57 and delta > 0:
            print(f"Station {event['id']} is {delay} seconds away from starting so we wait...")
            time.sleep(delay)
            water.WaterNow(event['id'], event['durationMinutes'])
            return True
    return False

def CheckForProblems(live_water, active_ids):
    if "deadlines" not in live_water:
        print("Error: Missing deadlines key in live water json. Adding it.")
        water.WriteLiveWaterAsJSONToFile(water.BuildEmptyLiveWaterDeadlines())
        live_water = water.GetLiveWaterScheduleAsJSON()
        assert("deadlines" in live_water)
        assert(len(live_water['deadlines']) == 0)

    if len(live_water['deadlines']) > 1:
        # Problem because we can only water one station at a time
        print("Error: More than 1 deadline")
        water.StopAllWater()

    if len(live_water['deadlines']) != len(active_ids):
        print(f"Error: More than 1 station is currently watering. Stopping all.")
        water.StopAllWater()
        water.WriteLiveWaterAsJSONToFile(water.BuildEmptyLiveWaterDeadlines())

    if len(active_ids) == 0:
        print("No watering taking place.")

def Run():
    '''
    This function is a safety mechanism supposed to be called as often as
    possible to ensure that we are properly shutting closing the watering
    stations.
    '''
    water.SetupGPIOs()
    print()

    live_water = water.GetLiveWaterScheduleAsJSON()
    active_ids = GetListOfIdsCurrentlyWatering()

    CheckForProblems(live_water, active_ids)

    now = datetime.today()
    timestamp_now = events.Timestamp(now)

    # Let's get the next events in the next 2 minutes
    next_events = events.GetCalendarEvents(timestamp_now + 120)
    if not next_events:
        print("No watering event upcoming soon.")
    else:
        if MaybeStartWatering(timestamp_now, next_events, active_ids):
            return

    if len(live_water['deadlines']):
        # We have a watering deadline. Let's make sure we haven't exceeded it
        end_timestamp = live_water['deadlines'][0]['end_timestamp']
        if (end_timestamp - timestamp_now) > (60 * 20):
            print(f"Watering end in: {(end_timestamp - timestamp_now)/60.0} minutes from now exceeded the 20 minutes threshold.\nThere is a problem.\nStopping water now.")
        if (timestamp_now > end_timestamp):
            StopWaterForId(live_water['deadlines'][0]['id'])
        elif (end_timestamp - timestamp_now) <= 57:
            remaining_time = end_timestamp - timestamp_now
            print(f"Remaining watering time ({remaining_time}) less than a minute. Waiting to stop right on time...")
            time.sleep(remaining_time)
            StopWaterForId(live_water['deadlines'][0]['id'])
        else:
            print(f"Current timestamp: {timestamp_now} is not exceeding end timestamp: {end_timestamp} for station id {live_water['deadlines'][0]['id']}")
            print(f"Remaining watering time: {end_timestamp - timestamp_now} seconds.")


if __name__ == "__main__":
    Run()
