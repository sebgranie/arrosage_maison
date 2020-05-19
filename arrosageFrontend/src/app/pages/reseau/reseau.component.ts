import { Component, OnInit } from '@angular/core';
import { Station } from '../../shared/models/reseau';
import { HttpClient } from '@angular/common/http';
import { ReseauService } from './reseau.service';

@Component({
  selector: 'app-reseau',
  templateUrl: './reseau.component.html',
  styleUrls: ['./reseau.component.css']
})
export class ReseauComponent implements OnInit {

  stations: Station[];
  activity = new Map<number, boolean>();

  constructor(private http: HttpClient, private reseauService: ReseauService) { }

  ngOnInit() {
    this.reseauService.getStations().subscribe(
      (stations) => {
        this.stations = stations.stations;
      }
    );

    this.reseauService.getWateringStates().subscribe(
      (wateringStates) => {
        this.activity = wateringStates;
      }
    )
  }

  public toggleButton(station: Station) {
    if (!this.activity.get(station.id)) {
      this.reseauService.triggerWatering(station).subscribe(
        (res) => {
          console.log(res);
        }
      );
    }
    this.activity.set(station.id, !this.activity.get(station.id));
  }

}
