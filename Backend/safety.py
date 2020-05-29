#!/usr/bin/env python3.7

from datetime import datetime

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

def Run():
    '''
    This function is a safety mechanism supposed to be called as often as
    possible to ensure that we are properly shutting closing the watering
    stations.
    '''
    water.SetupGPIOs()

    live_water = water.GetLiveWaterScheduleAsJSON()
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

    if len(live_water['deadlines']) == 0:
        print("No watering taking place. ")
        water.StopAllWater()
        return

    # We have a watering deadline. Let's make sure we haven't exceeded it
    now = datetime.today()
    timestamp_now = events.Timestamp(now)
    active_ids = GetListOfIdsCurrentlyWatering()
    if len(active_ids) > 1:
        print(f"Error: More than 1 station is currently watering. Stopping all.")
        water.StopAllWater()
        water.WriteLiveWaterAsJSONToFile(water.BuildEmptyLiveWaterDeadlines())
    end_timestamp = live_water['deadlines'][0]['end_timestamp']
    if (timestamp_now > end_timestamp):
        print("Watering exceeded timestamp, stopping now.")
        water.StopAllWater()
        water.WriteLiveWaterAsJSONToFile(water.BuildEmptyLiveWaterDeadlines())
    else:
        print(f"Current timestamp: {timestamp_now} is not exceeding end timestamp: {end_timestamp} for station id {live_water['deadlines'][0]['id']}")
        print(f"Remaining watering time: {end_timestamp - timestamp_now} seconds.")


if __name__ == "__main__":
    Run()
