import { Component, OnInit, OnDestroy } from '@angular/core';
import { Station, WateringStates } from '../../shared/models/reseau';
import { HttpClient } from '@angular/common/http';
import { ReseauService } from './reseau.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reseau',
  templateUrl: './reseau.component.html',
  styleUrls: ['./reseau.component.css']
})
export class ReseauComponent implements OnInit, OnDestroy {

  stations: Station[];
  activity: WateringStates[] = [];
  subscriptions: Subscription[] = [];

  constructor(private http: HttpClient, private reseauService: ReseauService) { }

  ngOnInit() {
    let getStations$ = this.reseauService.getStations().subscribe(
      (stations) => {
        this.stations = stations.stations;
      }
    );

    let getActivity$ = this.reseauService.getWateringStates().subscribe(
      (wateringStates) => {
        console.log(wateringStates);
        this.activity = wateringStates;
      }
    )
    this.subscriptions.push(getActivity$);
    this.subscriptions.push(getStations$);
  }

  public getWateringStates() {
    this.reseauService.getWateringStates().subscribe(
      (wateringStates) => {
        console.log(wateringStates);
        this.activity = wateringStates;
      }
    )
  }

  public toggleButton(station: Station) {
    if (!this.activity[station.id - 1].gpio) {
      this.reseauService.triggerWatering(station).subscribe(
        (res) => {
          console.log(res);
          this.getWateringStates();
        }
      );
    } else {
      this.reseauService.stopWatering().subscribe(
        (res) => {
          console.log(res);
          this.getWateringStates();
        }
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }

}
