import { Component } from '@angular/core';
import {QueuesService} from "../../services/queues.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = ''
  password: string = ''

  constructor(private queueService: QueuesService, private router: Router) {
  }

  async signIn() {
    if(this.queueService.signIN(this.email, this.password))
      await this.router.navigate(['main'])
  }
}


