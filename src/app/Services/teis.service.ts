import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { teisInvoices } from '../Modules/teisInvoices.module';

@Injectable({
  providedIn: 'root'
})
export class TEISService {

  constructor(private http:HttpClient) { }
  getTEIS(){
    return this.http.get<teisInvoices[]>("http://localhost:3000/TEIS");
  }
}
