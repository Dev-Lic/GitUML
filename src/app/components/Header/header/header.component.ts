import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
// import { Emitters } from 'src/app/emitters/emitter';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/Services/auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {

  isauthenticated = false 



  constructor(private auth: UserService, private router:Router) { }




    ngOnInit(): void {
      this.auth.isUserLoggedIn$.subscribe((isLoggedIn)=>{
           this.isauthenticated = isLoggedIn;
      })
    }



    logout(): void {
          localStorage.removeItem("token");
          this.auth.isUserLoggedIn$.next(false);  
          this.router.navigate(["login"])
    }
  }
