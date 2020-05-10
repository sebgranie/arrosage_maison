import { Component, OnInit } from '@angular/core';
import { ProgrammeService } from './programme.service';
import { Programme } from '../../shared/models/programme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModificationProgrammeComponent } from './modification-programme/modification-programme.component';

@Component({
  selector: 'app-programmes',
  templateUrl: './programmes.component.html',
  styleUrls: ['./programmes.component.css']
})
export class ProgrammesComponent implements OnInit {

  public programs = new Array<Programme>();

  constructor(private programmeService: ProgrammeService, private modalService: NgbModal) { }

  ngOnInit() {
    this.programmeService.getPrograms().subscribe(
      (programs) => {
        this.programmeService.programs = programs.programs;
        this.programs = this.programmeService.programs;
      }
    )
  }

  public editProgram(program: Programme) {
    console.log('edit programme ' + program.name);
    const modalRef = this.modalService.open(ModificationProgrammeComponent);
    modalRef.componentInstance.program = program;
  }

  public deleteProgram(index: number) {
    this.programmeService.deleteProgram(index).subscribe(
      () => {
        for (let i = 0; i < this.programmeService.programs.length; i++) {
          if(this.programmeService.programs[i].id === index) {
            this.programmeService.programs.splice(i, 1);
          }
        }
      });
  }
}
