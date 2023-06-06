import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {QueuesService} from "./queues.service";

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private queueService: QueuesService , private route: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.queueService.isSignIn()) {
      return true;
    } else {
      await this.route.navigate(['signIn']);
      return false;
    }
  }
}
