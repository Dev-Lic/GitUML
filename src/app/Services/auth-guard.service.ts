import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

import{Observable} from "rxjs";

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth : UserService , private router: Router) { }

   canActivate(): Observable<boolean>{
       if (!this.auth.isUserLoggedIn$.value){
        this.router.navigate(['/login']);
       }
       return this.auth.isUserLoggedIn$;

   }








}
