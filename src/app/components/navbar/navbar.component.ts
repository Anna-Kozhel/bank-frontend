import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {QueuesService} from "../../services/queues.service";
import {IQueue} from "../../../assets/models/IQueue";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  subscription: Subscription | undefined = undefined;
  isOpen: boolean = false;
  profile: IQueue = {checkNumber: "", data: "", email: "", middleName: "",name: "", phoneNumber: "", service: 0, surname: "", time: ""};
  isEdit: boolean = false;

  constructor(private router: Router, private queueService: QueuesService) {
  }

  ngOnInit(): void {
    this.subscription = this.queueService.stateProfile$
      .subscribe(data => {
        if (data) {
          this.profile = data;
        }
      });
    console.log(this.profile)
    this.queueService.getStreamProfile().then();
  }


  async routeToQueues() {
    await this.router.navigate(['/profile']);
  }

  openDiv() {
    this.isOpen = !this.isOpen;
  }

  edit() {
    if(this.isEdit)
      this.queueService.updateQueue(this.profile).then()
    this.isEdit = !this.isEdit;
  }
}
