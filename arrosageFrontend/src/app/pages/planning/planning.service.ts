import { HttpClient } from '@angular/common/http';
import { CalendarEvent } from 'angular-calendar';
import { CalendarEventQuery, CalendarEventResponse } from './interface';
import { environment } from '../../../environments/environment';

export class PlanningService {

    constructor(private http: HttpClient) {}

    getCalendarEvents(query: CalendarEventQuery) {
        return this.http.post<CalendarEventResponse[]>(`${environment.apiPort}api/events`,  query);
    }
}