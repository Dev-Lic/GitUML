import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { teisInvoices } from '../Modules/teisInvoices.module';
import { BehaviorSubject, Observable, catchError, finalize, timeout } from 'rxjs';
import { TeisInvoiceInputModule } from '../Modules/teis-invoice-input.module';

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
    return this.http.get<teisInvoices[]>("http://localhost:2000/Invoices");
  }
  
  private readonly TIMEOUT_DURATION = 10000; // Set timeout duration in milliseconds

  postTEIS(data:any): Observable<any>{
    return this.http.post<any>("http://localhost:2000/Invoices/charge",data,).pipe(
      timeout(this.TIMEOUT_DURATION),
      catchError(error => {
        // Handle error if necessary
        console.error('An error occurred:', error);
        throw error;
      })
      // ,
      // finalize(() => {
      //   this.triggerEvent();
      // })
    );
  }
}
