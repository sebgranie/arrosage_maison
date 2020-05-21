from datetime import date, datetime, timedelta
import calendar

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

def Timestamp(date):
    return calendar.timegm(date.timetuple())

def GetCalendarEvents(programs, reseaux, end_timestamp):
    '''
    Computes CalendarEvents from the existing programs and returns all of those
    taking place before the provided end_timestamp.
    Reminder: weekday() returns the day of the week start at 0 for Monday
    '''
    # print(end_timestamp)
    # end_date = datetime.fromtimestamp(end_timestamp)
    # print(f"end_date: {end_date}, {end_date.timetuple()}")
    # print(calendar.timegm(end_date.timetuple()))
    # re_end_date = datetime.utcfromtimestamp(
    #     calendar.timegm(end_date.timetuple()))
    # print(f"re_end_date: {re_end_date}")

    # today = datetime.today()
    # print(f"today: {today}, {today.timetuple()}")
    # re_today = datetime.utcfromtimestamp(calendar.timegm(today.timetuple()))
    # print(f"re_today: {re_today}, timestamp: {calendar.timegm(today.timetuple())}")

    calendar_events = []
    reseaux = reseaux['stations']
    for program in programs['programs']:
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
