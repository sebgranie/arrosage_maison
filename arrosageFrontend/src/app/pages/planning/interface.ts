
export interface CalendarEventQuery {
    endTimestamp: number; // In seconds
}

export interface CalendarEventResponse {
    timestamp: number; // In seconds
    title: string;
    id: number;
    durationMinutes: number;
    color: string;
}