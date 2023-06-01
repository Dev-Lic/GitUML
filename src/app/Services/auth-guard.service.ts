import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

import{Observable} from "rxjs";

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private UserService: UserService , private router: Router) { }

   canActivate(): Observable<boolean>{
       if (!this.UserService.isUserLoggedIn$.value){
        this.router.navigate(['/login']);
       }
       return this.UserService.isUserLoggedIn$;

   }








}
