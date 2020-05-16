import { HttpClient } from '@angular/common/http';
import { CalendarEvent } from 'angular-calendar';
import { CalendarEventQuery } from './interface';

export class PlanningService {

    constructor(private http: HttpClient) {}

    getCalendarEvents(query: CalendarEventQuery) {
        return this.http.post<CalendarEvent[]>('http://127.0.0.1:5000/api/events',  query);
    }
}