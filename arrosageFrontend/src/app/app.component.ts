import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreationProgrammeComponent } from './pages/programmes/creation-programme/creation-programme.component';
import smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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
  }

}

