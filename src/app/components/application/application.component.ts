import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {IQueue} from "../../../assets/models/IQueue";
import {QueuesService} from "../../services/queues.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent {
  queue: IQueue = {
    name: '',
    surname: '',
    middleName: '',
    email: '',
    phoneNumber: '',
    data: '',
    time: '',
    checkNumber: '',
    service: 0 || 1,
  }
  profile: IQueue = {
    checkNumber: "",
    data: "",
    email: "",
    middleName: "",
    name: "",
    phoneNumber: "",
    service: 0,
    surname: "",
    time: ""
  };
  subscription: Subscription | undefined = undefined;
  isSwitchOn1: boolean = false;
  isSwitchOn2: boolean = false;
  operationType = document.querySelector('#operationType');
  component = [true, false, false, false]
  inProgress = [false, false, false]
  selectedTypeOperation: string = '0';
  times: string[] = ["9:00", "9:20", "9:40", "10:00", "10:20", "10:40", "11:00", "11:20", "11:40", "12:00", "12:20", "12:40", "13:00", "13:20", "13:40", "14:00", "14:20", "14:40", "15:00", "15:20", "15:40", "16:00", "16:20", "16:40", "17:00", "17:20", "17:40", "18:00"];
  queues!: IQueue[];

  constructor(private router: Router, private queueService: QueuesService) {
  }

  ngOnInit(): void {
    this.subscription = this.queueService.stateQueue$
      .subscribe(data => this.queues = data);
    this.queueService.getStream().then();
    this.subscription = this.queueService.stateProfile$
      .subscribe(data => {
        if (data) {
          this.profile = data;
        }
      });
    this.queueService.getStreamProfile().then();
    this.queue.name = this.profile.name;
    this.queue.surname = this.profile.surname;

    this.queue.middleName = this.profile.middleName;
    this.queue.email = this.profile.email;

    console.log(this.queues.filter(item => item.service == this.queue.service))

  }

  async back(value: number) {
    if (value == -1)
      await this.router.navigate(['/main'])
    this.component[value] = true;
    this.component[value + 1] = false;

    if(value > -1 && value < 3)
      this.inProgress[value] = false;
  }

  async next(value: number) {
    if (value == -1) {
      this.queue.checkNumber = this.generateCheckNumber()
      await this.queueService.createQueue(this.queue);
      this.queueService.sendEmail(this.queue.email, 'Попередній запис на прийом', `Ви реєструвалися на прийом на №${this.queue.data} о №${this.queue.time}, послуга: ${this.getService(this.queue.service)}\nЧек: №${this.queue.checkNumber}.\nЧекаємо на Вас!`)
      await this.router.navigate(['/main'])
    }
    console.log(this.queue)
    this.component[value] = true;
    this.component[value - 1] = false;
    if(value != -1)
      this.inProgress[value - 1] = true;
  }

  generateCheckNumber() {
    const characters = '0123456789';
    let randomKey = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomKey += characters[randomIndex];
    }

    return randomKey;
  }

  getService(num: number) {
    switch (num.toString()) {
      case "0":
        return "Грошові вклади з врахуванням різних валют"
      case "1":
        return "Кредити"
      case "2":
        return "Банківські/кредитні картки"
      case "3":
        return "Іпотека"
      case "4":
        return "Індивідуальні сейфи"
      case "5":
        return "Платежі"
      case "6":
        return "Прийом та видача готівки/пенсія"
      case "7":
        return "Грошові перекази"
      case "8":
        return "Валютно-обмінні операції"
      default :
        return ""
    }
  }

  validationDate() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Місяці в JavaScript починаються з 0, тому додаємо 1
    const currentDay = currentDate.getDate();

    const dateArray = this.queue.data.split("-");

    if (Number(dateArray[0]) == currentYear) {
      if (Number(dateArray[1]) == currentMonth) {
        if (
          Number(dateArray[2]) == currentDay ||
          Number(dateArray[2]) == (currentDay + 1) ||
          Number(dateArray[2]) == (currentDay + 2) ||
          Number(dateArray[2]) == (currentDay + 3) ||
          Number(dateArray[2]) == (currentDay + 4)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  validTime() {
    console.log('here', this.queues.filter(item => item.service == this.queue.service).filter(item => this.queue.data == item.data))
    console.log(this.times.length)
    this.times = this.times.filter((item1) => {
      return !this.queues.filter(item => item.service == this.queue.service).filter(item => this.queue.data == item.data).some((item2) => item1 === item2.time);
    });
  }
}

