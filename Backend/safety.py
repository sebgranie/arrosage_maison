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
    '''
    Starts watering if the current timestamp fall within the watering time window
    Returns:
      True if a station has been started
    '''
    for event in events:
        delta = event['timestamp'] - timestamp_now
        if delta < 0 and timestamp_now < (event['timestamp'] + (60 * event['durationMinutes'])):
            print(f"Station {event['id']} is supposed to be watering.")
            # We turn it ON only if it wasn't already because WaterNow() first stops
            # all watering.
            if event['id'] not in active_ids:
                print(f"Station {event['id']} will now be started.")
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

def RunSafetyChecks():
    '''
    This function is a safety mechanism supposed to be called as often as
    possible to ensure that we are properly shutting closing the watering
    stations.
    '''
    live_water = water.GetLiveWaterScheduleAsJSON()
    active_ids = GetListOfIdsCurrentlyWatering()

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
        water.WriteLiveWaterAsJSONToFile(water.BuildEmptyLiveWaterDeadlines())
        return

    if len(live_water['deadlines']) != len(active_ids):
        print(f"Error: Mismatch between the planned and effective watering states. Stopping all.")
        water.StopAllWater()
        water.WriteLiveWaterAsJSONToFile(water.BuildEmptyLiveWaterDeadlines())
        return

    if len(active_ids) == 0:
        print("No watering taking place.")
        return

    # We have a watering deadline. Let's check the ids match
    if active_ids[0] != live_water['deadlines'][0]['id']:
        print(f"Error: Mismatch between the planned watering station id and effective watering station id. Stopping all.")
        water.StopAllWater()
        water.WriteLiveWaterAsJSONToFile(water.BuildEmptyLiveWaterDeadlines())
        return

    timestamp_now = events.Timestamp(datetime.today())

    # Let's make sure the deadlines is not too far in the future. If it is, it indicates a problem
    end_timestamp = live_water['deadlines'][0]['end_timestamp']
    if (end_timestamp - timestamp_now) > (60 * 20):
        print(f"Watering end in: {(end_timestamp - timestamp_now)/60.0} minutes from now exceeded the 20 minutes threshold.\nThere is a problem.\nStopping water now.")
        water.StopAllWater()
        water.WriteLiveWaterAsJSONToFile(water.BuildEmptyLiveWaterDeadlines())
        return

    # Let's make sure we haven't exceeded the deadline
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

def RunScheduler():
    live_water = water.GetLiveWaterScheduleAsJSON()
    active_ids = GetListOfIdsCurrentlyWatering()

    now = datetime.today()
    timestamp_now = events.Timestamp(now)

    # Let's get the next events in the next 2 minutes
    next_events = events.GetCalendarEvents(timestamp_now + 120)
    if not next_events:
        print("No watering event upcoming soon.")

    MaybeStartWatering(timestamp_now, next_events, active_ids)


def Run():
    '''
    Main function to be run every minute. Performs safety checks
    '''
    water.SetupGPIOs()

    RunSafetyChecks()
    RunScheduler()

if __name__ == "__main__":
    Run()
