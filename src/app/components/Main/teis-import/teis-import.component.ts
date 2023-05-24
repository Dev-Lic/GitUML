import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TEISService } from 'src/app/Services/teis.service';
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
  
  inputValue!:number;

  // @Output() dataImported = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TeisImportComponent>,private api:TEISService){}

  ngOnInit(){

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

        for (let index = 0; index < this.data.length; index++) {
          // const element = array[index];
          // console.log(this.data[index]);
          if (this.data[index].length !== 0) {
            console.log(this.data[index]);
          }          
        }
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

    value: number | null = null;

    onEnter(value: string) {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        this.value = parsedValue;
      } else {
        // Handle invalid input case
        console.log('Invalid input:', value);
      }
    }


}
