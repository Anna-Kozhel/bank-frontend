import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'BankingInstitution';
  isApplication = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isApplication = this.router.url === '/application' || this.router.url === '/signIn';
    });
  }
}

