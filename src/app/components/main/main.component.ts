import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {QueuesService} from "../../services/queues.service";
import {IQueue} from "../../../assets/models/IQueue";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  subscription: Subscription | undefined = undefined;
  profile: IQueue = {checkNumber: "", data: "", email: "", middleName: "",name: "", phoneNumber: "", service: 0, surname: "", time: ""};
  isCancelApplication = false;
  checkNumber = ''

  constructor(private router: Router, private queueService: QueuesService) {
  }

  ngOnInit(): void {
    this.subscription = this.queueService.stateProfile$
      .subscribe(data => {
        if (data) {
          this.profile = data;
        }
      });
    this.queueService.getStreamProfile().then();
  }

  async routeToQueues() {
    await this.router.navigate(['/queues']);
  }

  async routeApplication() {
    await this.router.navigate(['/application']);
  }

  cancelApplication() {
    this.isCancelApplication = !this.isCancelApplication;
  }

  async cancelQueue() {
    await this.queueService.deleteQueue(this.checkNumber);
    await this.router.navigate([''])
  }
}
