import {Component, OnInit} from '@angular/core';
import {QueuesService} from "../../services/queues.service";
import {Service} from "../../../assets/models/Service";
import {ActivatedRoute} from "@angular/router";
import {IQueue} from "../../../assets/models/IQueue";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {
  subscription: Subscription | undefined = undefined;
  typeOfService!: Service;
  data!: IQueue[];

  constructor(private queueService: QueuesService, private route: ActivatedRoute) {
    this.typeOfService = this.route.snapshot.data['typeOfService'];
  }

  ngOnInit(): void {
    this.subscription = this.queueService.stateQueue$
      .subscribe(data => this.data = data.filter(el => el.service === this.typeOfService));
    this.queueService.getStream().then();
  }

  divideDataByDate(day: number) {
    const currentDate = new Date();
    currentDate.setDate(new Date().getDate() + day);
    let filterArray = this.data.filter(el => new Date(el.data).getDay() === currentDate.getDay());
    return filterArray.sort((a, b) => Number(a.time) - Number(b.time));
  }


  printDate(number: number) {
    if(this.divideDataByDate(number).length !== 0)
      return this.divideDataByDate(number)[0].data
    else
      return 0
  }
}
