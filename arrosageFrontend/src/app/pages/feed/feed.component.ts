

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreationProgrammeComponent } from '../programmes/creation-programme/creation-programme.component';
import smoothscroll from 'smoothscroll-polyfill';
import { AuthService } from '../login/auth.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  constructor(private router: Router, private modalService: NgbModal, private authService: AuthService) { }


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

  public logout() {
    this.authService.logout();
  }

}

