import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import smoothscroll from 'smoothscroll-polyfill';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  constructor(private router: Router) { }

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

}
