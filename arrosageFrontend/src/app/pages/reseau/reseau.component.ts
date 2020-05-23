import { Component, OnInit, OnDestroy } from '@angular/core';
import { Station, WateringStates } from '../../shared/models/reseau';
import { HttpClient } from '@angular/common/http';
import { ReseauService } from './reseau.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-reseau',
  templateUrl: './reseau.component.html',
  styleUrls: ['./reseau.component.css']
})
export class ReseauComponent implements OnInit, OnDestroy {

  stations: Station[];
  activity: WateringStates[] = [];
  subscriptions: Subscription[] = [];
  interval;
  source = timer(1000, 2000);

  constructor(private http: HttpClient, private reseauService: ReseauService) { }

  ngOnInit() {
    let getStations$ = this.reseauService.getStations().subscribe(
      (stations) => {
        this.stations = stations.stations;
      }
    );
    this.startGettingWateringStates();
    this.subscriptions.push(getStations$);
  }


  public startGettingWateringStates() {
    this.interval = setInterval(() => {
      let watering$ = this.reseauService.getWateringStates().subscribe(
        (wateringStates) => {
          console.log(wateringStates);
          this.activity = wateringStates;
          watering$.unsubscribe();
        }
      )
    }, 2000)
  }

  public toggleButton(station: Station) {
    if (!this.activity[station.id - 1].gpio) {
      this.reseauService.triggerWatering(station).subscribe(
        (res) => {
          console.log(res);
        }
      );
    } else {
      this.reseauService.stopWatering().subscribe(
        (res) => {
          console.log(res);
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

