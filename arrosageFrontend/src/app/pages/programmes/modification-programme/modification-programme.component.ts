import { Component, OnInit, Input } from '@angular/core';
import { Programme } from '../../../shared/models/programme';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ProgrammeService } from '../programme.service';
import { ArrosageReseau } from '../../../shared/models/arrosage-reseau';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modification-programme',
  templateUrl: './modification-programme.component.html',
  styleUrls: ['./modification-programme.component.css']
})
export class ModificationProgrammeComponent implements OnInit {

  reseaux: Array<string> = ['Reseau1', 'Reseau2', 'Reseau3']; // TO-DO : A récupérer de l'api
  days: Array<string> = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  reseauxSelectionnes: Array<string> = [];
  daysSelectionnes: Array<string> = [];

  form: FormGroup;
  tableauDeReseaux: string[];
  @Input() program: Programme;

  constructor(
    private formBuilder: FormBuilder,
    private programService: ProgrammeService,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      favReseaux: this.addReseauxControls(),
      favDays: this.addDaysControls(),
      name: new FormControl(this.program.name, {
        validators: Validators.required
      }),
      startTime: new FormControl(this.program.startTime, {
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
      id: this.program.id,
      name: this.form.controls.name.value,
      active: true,
      days: this.daysSelectionnes,
      startTime: this.form.controls.startTime.value,
      arrosageReseaux: this.computeReseaux()
    };

    if (this.form.status === 'VALID' && this.reseauxSelectionnes.length >= 1) {
      this.activeModal.close();
    }

    // this.programService.updateProgram(this.program.id, newProgramm); // TO-DO: Implémenter l'api PUT dans le Back
    console.log('Programme ' + this.program.id + ' updaté');
  }

  public computeReseaux(): ArrosageReseau[] {
    const durations: number[] = [];
    for (let i = 0; i < this.reseauxSelectionnes.length; i++) {
      if (+this.reseauxSelectionnes[i].substring(this.reseauxSelectionnes[i].length - 1, this.reseauxSelectionnes[i].length) === 1) {
        durations.push(this.form.controls.durationReseau1.value);
      } else if (+this.reseauxSelectionnes[i].substring(this.reseauxSelectionnes[i].length - 1, this.reseauxSelectionnes[i].length) === 2) {
        durations.push(this.form.controls.durationReseau2.value);
      } else if (+this.reseauxSelectionnes[i].substring(this.reseauxSelectionnes[i].length - 1, this.reseauxSelectionnes[i].length) === 3) {
        durations.push(this.form.controls.durationReseau3.value);
      }
    }

    const reseaux: ArrosageReseau[] = [];
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
