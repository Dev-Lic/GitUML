import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const localToken = localStorage.getItem('token');
         if(localToken) {
          const clonedRequest = request.clone({
     headers: request.headers.set('authorization' , 'Bearer' + localToken)
    });
    console.log(clonedRequest)
    return next.handle(clonedRequest); 

      }else {
        
        return next.handle(request);
      }

  }
}
