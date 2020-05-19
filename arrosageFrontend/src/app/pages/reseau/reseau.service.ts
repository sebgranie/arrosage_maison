import { Stations, Station, StationTrigger } from '../../shared/models/reseau';
import { HttpClient } from '@angular/common/http';


export class ReseauService {

    constructor(private http: HttpClient) { }

    public getStations() {
        return this.http.get<Stations>('http://127.0.0.1:5000/api/stations');
    }

    public getWateringStates() {
        return this.http.get<Map<number, boolean>>('http://127.0.0.1:5000/api/water');
    }

    public triggerWatering(station: Station) {
        return this.http.post<StationTrigger>('http://127.0.0.1:5000/api/stations', {
            id: station.id,
            minutes: 5
        });
    }




}