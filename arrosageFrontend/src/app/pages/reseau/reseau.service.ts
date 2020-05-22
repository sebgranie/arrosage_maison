import { Stations, Station, StationTrigger, WateringStates } from '../../shared/models/reseau';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


export class ReseauService {

    constructor(private http: HttpClient) { }

    public getStations() {
        return this.http.get<Stations>(`${environment.apiPort}api/stations`);
    }

    public getWateringStates() {
        return this.http.get<WateringStates[]>(`${environment.apiPort}api/water`);
    }

    public triggerWatering(station: Station) {
        return this.http.post<StationTrigger>(`${environment.apiPort}api/water`, {
            id: station.id,
            minutes: 5
        });
    }

    public stopWatering() {
        return this.http.delete<StationTrigger>(`${environment.apiPort}api/water`);
    }




}