import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login } from '../Modules/userDataType';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
// import { Emitters } from '../emitters/emitter';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  constructor(private http:HttpClient, private router: Router) { }


postLogin(data: any){

  this.http.post('http://localhost:2000/auth/login', data)
  .subscribe(
    (response:any) => {
      console.log('response :', response);
      console.log('you are logged in ',data); 
      localStorage.setItem('token', response.accessToken)
      // localStorage.setItem('token',response.)
      this.isUserLoggedIn$.next(true);
      this.router.navigateByUrl('/');
      // Emitters.authEmitter.emit(true)
    
    },
    (error) => {
      // console.error('error : ', error);
   return throwError(new Error('Failed to login'));
  //  Emitters.authEmitter.emit(false)
    }
  );
}

logout(){}

 isUserLoggedIn$ = new BehaviorSubject<boolean>(false);


 httpOptions: { headers: HttpHeaders } = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

// isUserLoggedIn(): boolean {
//   if (localStorage.getItem("token") != null) {
//     return true;
//   }
//   return false;
// }


isUserLoggedIn(){
 return !!localStorage.getItem('token');
}




}



  
