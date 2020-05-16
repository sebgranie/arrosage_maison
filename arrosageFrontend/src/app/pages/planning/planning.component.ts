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
import { CalendarEventQuery } from './interface';


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
};

@Component({
  selector: 'app-planning',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  events: CalendarEvent[];
  errorMessage: string = '';
  activeDayIsOpen = true;

  constructor(private planningService: PlanningService) { }

  ngOnInit() {

    const date : CalendarEventQuery = {
      endDate: new Date(2020, 4, 20)
    }
    
    this.planningService.getCalendarEvents(date).subscribe(
      (calendartEvents) => {
        console.log(calendartEvents);
        this.events = calendartEvents;
      }, (error) => {
        this.errorMessage = 'Aucun évènement calendrier n\'a pu être récupéré depuis le serveur'
        console.log(error);
        this.events = [];
      }
    )
    
    // this.events = [
    //   {
    //     start: new Date(2020, 4, 11, 6, 30, 0),
    //     title: 'Programme nuit',
    //     color: colors.red,
    //     actions: this.actions,
    //     allDay: false,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //     draggable: true,
    //   }
    // ];
  }

  public handleEvent(event: CalendarEvent) {
    const pipe = new DatePipe('fr-FR');
    console.log('Titre du programme : ' + event.title);
    // console.log('Start time : ' + pipe.transform(event.start, 'medium'));
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
