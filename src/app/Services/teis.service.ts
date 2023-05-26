import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { teisInvoices } from '../Modules/teisInvoices.module';
import { BehaviorSubject, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TEISService {

  constructor(private http:HttpClient) { }
  
  private eventSubject = new BehaviorSubject<boolean>(false);
  public event$ = this.eventSubject.asObservable();

  triggerEvent() {
    this.eventSubject.next(true);
  }

  getTEIS(){
    return this.http.get<teisInvoices[]>("http://localhost:3000/TEIS");
  }

  postTEIS(data:any[]){
    return this.http.post<any>("http://localhost:3000/TEIS",data).pipe(
      catchError(error => {
        // Handle error if necessary
        console.error('An error occurred:', error);
        throw error;
      })
    );;
  }
}
