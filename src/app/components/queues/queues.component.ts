import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-queues',
  templateUrl: './queues.component.html',
  styleUrls: ['./queues.component.css']
})
export class QueuesComponent {


  constructor(private router: Router) {
  }

  async routeToQueue(value: string) {
    await this.router.navigate([`/queue/` + value])
  }
}
