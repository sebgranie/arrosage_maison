import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import smoothscroll from 'smoothscroll-polyfill';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreationProgrammeComponent } from '../programmes/creation-programme/creation-programme.component';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  constructor(private router: Router, private modalService: NgbModal) { }


  ngOnInit() {
    smoothscroll.polyfill();
  }

  public goToCreation() {
    this.router.navigate(['/creation-programme']);
  }

  public scrollToElement(element: string): void {
    const target = document.getElementById(element);
    target.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  public openCreationModal() {
    const modalRef = this.modalService.open(CreationProgrammeComponent);
    modalRef.componentInstance.name = 'World';
  }

}
