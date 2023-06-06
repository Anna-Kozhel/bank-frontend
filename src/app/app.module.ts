import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { QueuesComponent } from './components/queues/queues.component';
import {AppRoutingModule} from "./app-routing.module";
import { QueueComponent } from './components/queue/queue.component';
import { ApplicationComponent } from './components/application/application.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { SignInComponent } from './components/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    QueuesComponent,
    QueueComponent,
    ApplicationComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
