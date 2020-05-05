import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Programme } from '../../../shared/models/programme';
import { Reseau } from '../../../shared/models/reseau';

@Component({
  selector: 'app-creation-programme',
  templateUrl: './creation-programme.component.html',
  styleUrls: ['./creation-programme.component.css']
})
export class CreationProgrammeComponent implements OnInit {

  reseaux: Array<string> = ['Reseau1', 'Reseau2', 'Reseau3']; // TO-DO : A récupérer de l'api
  days: Array<string> = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  reseauxSelectionnes: Array<string> = [];
  daysSelectionnes: Array<string> = [];

  form: FormGroup;
  tableauDeReseaux: string[];

  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      favReseaux: this.addReseauxControls(),
      favDays: this.addDaysControls(),
      name: new FormControl('', {
        validators: Validators.required
      }),
      startTime: new FormControl({ hour: 0, minute: 0 }, {
        validators: Validators.required
      }),
      durationReseau1: new FormControl(),
      durationReseau2: new FormControl(),
      durationReseau3: new FormControl(),
    });
  }

  public addReseauxControls() {
    const arr = this.reseaux.map(element => {
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }

  public addDaysControls() {
    const arr = this.days.map(element => {
      return this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }

  get reseauxArray() {
    return this.form.get('favReseaux') as FormArray;
  }

  get daysArray() {
    return this.form.get('favDays') as FormArray;
  }

  public addValeurJoursSelectionnes() {
    this.daysSelectionnes = [];
    this.daysArray.controls.forEach((control, i) => {
      if (control.value) {
        this.daysSelectionnes.push(this.days[i]);
      }
    });
  }

  public addValeurReseauxSelectionnes(index: number) {
    this.reseauxSelectionnes.push(this.reseaux[index]);
  }

  public validateCreation() {
    const newProgramm: Programme = {
      id: '4',
      name: this.form.controls.name.value,
      days: this.daysSelectionnes,
      startTime: this.form.controls.startTime.value,
      reseaux: this.computeReseaux()
    };

    if (this.form.status === 'VALID' && this.reseauxSelectionnes.length >= 1) {
      this.activeModal.close();
    }

    // TO-DO : Appel api vers création d'un programme

    console.log(newProgramm);
  }

  public computeReseaux(): Reseau[] {

    const durations: number[] = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.reseauxSelectionnes.length; i++) {
      if (+this.reseauxSelectionnes[i].substring(this.reseauxSelectionnes[i].length - 1, this.reseauxSelectionnes[i].length) === 1) {
        durations.push(this.form.controls.durationReseau1.value);
      } else if (+this.reseauxSelectionnes[i].substring(this.reseauxSelectionnes[i].length - 1, this.reseauxSelectionnes[i].length) === 2) {
        durations.push(this.form.controls.durationReseau2.value);
      } else if (+this.reseauxSelectionnes[i].substring(this.reseauxSelectionnes[i].length - 1, this.reseauxSelectionnes[i].length) === 3) {
        durations.push(this.form.controls.durationReseau3.value);
      }
    }

    const reseaux: Reseau[] = [];
    for (let i = 0; i < this.reseauxSelectionnes.length; i++) {
      reseaux.push({
        id: +this.reseauxSelectionnes[i].substring(this.reseauxSelectionnes[i].length - 1, this.reseauxSelectionnes[i].length),
        duration: {
          hour: 0,
          minute: durations[i]
        }
      });
    }

    return reseaux;
  }

}
