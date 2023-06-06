import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {QueuesComponent} from "./components/queues/queues.component";
import {QueueComponent} from "./components/queue/queue.component";
import {ApplicationComponent} from "./components/application/application.component";
import {RouteGuardService} from "./services/route-guard.service";
import {SignInComponent} from "./components/sign-in/sign-in.component";

const routes: Routes = [
  {path: '', component: MainComponent, canActivate:[RouteGuardService]},
  {path: 'signIn', component: SignInComponent},
  {path: 'main', component: MainComponent, canActivate:[RouteGuardService]},
  {path: 'queues', component: QueuesComponent, canActivate:[RouteGuardService]},
  {path: 'queue/currencyDeposits', component: QueueComponent, data: {typeOfService: 0}, canActivate:[RouteGuardService]},
  {path: 'queue/credit', component: QueueComponent, data: {typeOfService: 1}, canActivate:[RouteGuardService]},
  {path: 'queue/bankCards', component: QueueComponent, data: {typeOfService: 2}, canActivate:[RouteGuardService]},
  {path: 'queue/mortgage', component: QueueComponent, data: {typeOfService: 3}, canActivate:[RouteGuardService]},
  {path: 'queue/safeBox', component: QueueComponent, data: {typeOfService: 4}, canActivate:[RouteGuardService]},
  {path: 'queue/payments', component: QueueComponent, data: {typeOfService: 5}, canActivate:[RouteGuardService]},
  {path: 'queue/cash', component: QueueComponent, data: {typeOfService: 6}, canActivate:[RouteGuardService]},
  {path: 'queue/moneyTransfers', component: QueueComponent, data: {typeOfService: 7}, canActivate:[RouteGuardService]},
  {path: 'queue/valuta', component: QueueComponent, data: {typeOfService: 8}, canActivate:[RouteGuardService]},
  {path: 'application', component: ApplicationComponent, canActivate:[RouteGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
