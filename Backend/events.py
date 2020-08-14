from datetime import date, datetime, timedelta
import calendar

from station import GetAllStationsAsJSON
from program import GetAllProgramsAsJSON

weekDays = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche"
]

colors = ['red', 'blue', 'yellow', 'green', 'pink']

def Timestamp(date: datetime):
    return calendar.timegm(date.timetuple())

def GetTimestampInMinutesFromNow(minutes: int):
    today = datetime.today()
    today+= timedelta(minutes=minutes)
    return Timestamp(today)

def GetCalendarEvents(end_timestamp: int):
    '''
    Computes CalendarEvents from the existing programs and returns all of those
    taking place before the provided end_timestamp.
    Reminder: weekday() returns the day of the week start at 0 for Monday
    '''
    calendar_events = []
    reseaux = GetAllStationsAsJSON()['stations']
    programs = GetAllProgramsAsJSON()['programs']
    for program in programs:
        print(f"Computing CalendarEvents for the program: {program['id']}")
        # Computing the datetime object representing the start of the program
        running_date = datetime.today()
        running_date = running_date.replace(hour=2, minute=2, second=0)
        while Timestamp(running_date) < end_timestamp:
            # Iteration over every days from now to the end timestamp date.
            # If the program doesn't require watering that day, we skip it
            if weekDays[running_date.weekday()] not in program['days']:
                running_date += timedelta(days=1)
                continue
            # Set the program start time in the running date
            running_date = running_date.replace(hour=program['startTime']['hour'],
                                                minute=program['startTime']['minute'])
            for reseau in program['arrosageReseaux']:
                # First add the calendar event with the current timestamp and
                # duration and then move the date by the amount of time it take
                calendarEvent = {}
                calendarEvent['timestamp'] = Timestamp(running_date)
                calendarEvent['title'] = f"Programme: {program['name']}\nReseau: {reseaux[reseau['id']-1]['location']}"
                calendarEvent['id'] = reseau['id']
                calendarEvent['durationMinutes'] = reseau['duration']['minute']
                calendarEvent['color'] = colors[reseau['id']-1]
                calendar_events.append(calendarEvent)
                running_date += timedelta(minutes=reseau['duration']['minute'])
            running_date += timedelta(days=1)
    print(f"Produced {len(calendar_events)} calendar events.")
    return calendar_events


if __name__ == "__main__":
    test = {
        "calendarEvents": [
            {
                "timestamp": 1591021265,
                "title": "Programme: Arrosage Pelouse du Matin\nReseau: Jets Longs",
                "id": 1,
                "durationMinutes": 10,
                "color": "red"
            },
            {
                "timestamp": 1591023265,
                "title": "Programme: Arrosage Pelouse du Matin\nReseau: Whatever",
                "id": 2,
                "durationMinutes": 5,
                "color": "blue"
            },
        ]
    }
