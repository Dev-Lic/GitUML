import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { teisInvoices } from 'src/app/Modules/teisInvoices.module';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-teis-import',
  templateUrl: './teis-import.component.html',
  styleUrls: ['./teis-import.component.scss']
})
export class TeisImportComponent implements OnInit{
  // data !: teisInvoices[]   ;
  dataExcel!: [][]
  ConfigForm !: FormGroup;
  data!: any[];
  headers!: string[];


  // @Output() dataImported = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TeisImportComponent>,){}

  ngOnInit(){
    const subscription = this.MadInputSubject.subscribe((value: string) => {
      console.log(value);
      // store the value in a variable
      const inputValue = value;
    });
  }

  onFileChange(evt:any) {

    const target : DataTransfer = <DataTransfer> (evt.target);
    //throw error when the user try to upload more than one file
    if(target.files.length !== 1) throw new Error('cannot use multiple files') ;
      //To read the file
      const reader : FileReader = new FileReader();
      // unload files
      reader.onload = (e:any) =>{
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr , {type: 'binary'});

        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        // Store the parsed data in the data variable
        this.data = XLSX.utils.sheet_to_json(ws, {header: 1});

        // Store the column headers in the headers variable
        this.headers = this.data.shift();
        console.log(this.headers)

        console.log(this.data);
      }

        reader.readAsBinaryString(target.files[0]);
    }

    addBill(){
      // if(this.ConfigForm.valid){
      //   console.log(this.ConfigForm.value);
      //   console.log(this.dataExcel)
      //   this.dialogRef.close(this.dataExcel)
      // }
    }
    MadInputSubject = new Subject<string>();
    MatInput$ = this.MadInputSubject.asObservable();

    onUserInputChange(event: Event) {
      const userInput = (event.target as HTMLInputElement).value;
      this.MadInputSubject.next(userInput);
    }

}
