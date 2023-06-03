import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class CustomInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth: UserService) {}

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // const localToken = localStorage.getItem('token');
//     const localToken = this.auth.getToken();
//          if(localToken) {
//           const clonedRequest = request.clone({
//     //  headers: request.headers.set('authorization','Bearer' +localToken)
//  setHeaders:{
//   Authorization: `Bearer ${localToken}`
//  }    });
//     return next.handle(clonedRequest); 
    

//       }else {

//         return next.handle(request);
//       }

//   }
// }

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const localToken = localStorage.getItem('token');
  // const localToken = this.auth.getToken();
       if(localToken) {
        const clonedRequest = request.clone({
   headers: request.headers.set('authorization','Bearer ' + localToken)})
   console.log(clonedRequest)
    return next.handle(clonedRequest); 
  

    }else {

      return next.handle(request);
    }

}
}
