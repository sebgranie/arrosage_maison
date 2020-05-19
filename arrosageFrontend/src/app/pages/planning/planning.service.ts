import { HttpClient } from '@angular/common/http';
import { CalendarEvent } from 'angular-calendar';
import { CalendarEventQuery } from './interface';
import { environment } from '../../../environments/environment';

export class PlanningService {

    constructor(private http: HttpClient) {}

    getCalendarEvents(query: CalendarEventQuery) {
        return this.http.post<CalendarEvent[]>(`${environment.apiPort}api/events`,  query);
    }
}