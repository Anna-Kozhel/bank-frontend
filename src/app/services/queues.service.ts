import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IQueue} from "../../assets/models/IQueue";
import {IEmailRequest} from "../../assets/models/IEmailRequest"
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QueuesService {
  private baseURL = 'https://bank-backend.herokuapp.com'

  private stateQueue = new Subject<IQueue[]>();
  private stateProfile = new Subject<IQueue>();

  private currentQueue: IQueue[] = [];
  private currentProfile: IQueue = {checkNumber: "", data: "", email: "", middleName: "",name: "", phoneNumber: "", service: 0, surname: "", time: ""};
  private emailRequest: IEmailRequest = {to: "", subject: "", body: ""};

  private email: string = 'anna.kozhel.pm.2020@lpnu.ua';
  private password: string = '123456';

  stateQueue$ = this.stateQueue.asObservable();
  stateProfile$ = this.stateProfile.asObservable();

  constructor(private http: HttpClient) {
    this.getQueue();
  }

   getQueue() {
    this.http.get<IQueue[]>(this.baseURL + "/users/queues")
      .subscribe(async (data: IQueue[]) => {
        console.log(data)
        this.currentQueue = data;
        await this.getStream();
        await this.getProfile();
      });
    return this.currentQueue;
  }

  async getProfile() {
    console.log(this.currentQueue)
    this.currentProfile = this.currentQueue.find(el => el.email == this.email) ||
      {checkNumber: "", data: "", email: "", middleName: "",name: "", phoneNumber: "", service: 0, surname: "", time: ""};
    await this.getStreamProfile();
    return this.currentProfile;
  }

  async updateQueue(queue?: IQueue) {
    if (queue !== undefined) {
      this.http.put<IQueue>(this.baseURL + `/user/queue/update/${queue.email}`, queue)
        .subscribe((queue: IQueue) => {
          this.getQueue();
        })
    }
  }

  async createQueue(queue?: IQueue) {
    if (queue !== undefined) {
      this.http.post<IQueue>(this.baseURL + '/user/queue/add', queue)
        .subscribe((queue: IQueue) => {
          this.currentQueue.push(queue);
        })
    }
    await this.getStream();
  }


  async deleteQueue(checkNumber ?: string) {
    if (checkNumber !== undefined) {
      this.http.delete<{ checkNumber: string }>(this.baseURL + `/user/queue/${checkNumber}`)
        .subscribe(el => console.log(el))
      this.currentQueue.filter(contact => contact.checkNumber !== checkNumber);
    }
    await this.getStream();
  }

  signIN(email: string, password: string) {
    if(this.isSignIn())
      return true;
    if (this.email === email && this.password == password)
      sessionStorage.setItem('authenticateUser', 'client');
    return this.email === email && this.password == password;
  }

  isSignIn() {
    const client = sessionStorage.getItem('authenticateUser');
    return !(client === null)
  }

  async getStream(queue ?: IQueue[]) {
    if (queue == undefined)
      this.stateQueue.next(this.currentQueue);
    else
      this.stateQueue.next(queue);
  }

  async getStreamProfile(profile ?: IQueue) {
    if (profile == undefined)
      this.stateProfile.next(this.currentProfile);
    else
      this.stateProfile.next(profile);
  }

  sendEmail(to_: string, subject_: string, body_: string): void {
    this.emailRequest.to = to_;
    this.emailRequest.subject = subject_;
    this.emailRequest.body = body_;

    this.http.post<IEmailRequest>(this.baseURL + '/send-email', this.emailRequest)
      .subscribe(() => {
        console.log("sent")
      })
  }
}
