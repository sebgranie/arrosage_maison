import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import {
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { PlanningService } from './planning.service';
import { CalendarEventQuery, CalendarEventResponse } from './interface';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#2e8016',
    secondary: '#b8f5a6',
  },
  pink: {
    primary: '#8c1486',
    secondary: '#ffbafc',
  },
};

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  dayEndHour = 9;
  dayStartHour = 7;
  events: CalendarEvent[];
  errorMessage: string = '';
  activeDayIsOpen = true;

  constructor(private planningService: PlanningService) { }

  ngOnInit() {

    const date: CalendarEventQuery = {
      endTimestamp: (new Date(2020, 6, 1)).getTime() / 1000
    }

    this.planningService.getCalendarEvents(date).subscribe(
      (calendartEvents) => {
        console.log(calendartEvents);
        this.events = this.buildCalendarEvents(calendartEvents);
        console.log(this.events)
      }, (error) => {
        this.errorMessage = 'Aucun évènement calendrier n\'a pu être récupéré depuis le serveur'
        console.log(error);
        this.events = [];
      }
    )
  }

  public buildCalendarEvents(events: CalendarEventResponse[]) {
    const calendarEvents: CalendarEvent[] = [];
    events.forEach(event => {
      calendarEvents.push({
        start: new Date(event.timestamp * 1000),
        end: new Date((event.timestamp * 1000) + (event.durationMinutes * 60 * 1000)),
        title: event.title,
        color: colors[event.color]
      })
    });
    return calendarEvents;
  }

  public handleEvent(event: CalendarEvent) {
    const pipe = new DatePipe('fr-FR');
    console.log('Titre du programme : ' + event.title);
    console.log('Start time : ' + event.start);

  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
