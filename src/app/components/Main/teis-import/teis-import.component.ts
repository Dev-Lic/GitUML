import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-teis-import',
  templateUrl: './teis-import.component.html',
  styleUrls: ['./teis-import.component.scss']
})
export class TeisImportComponent implements OnInit{
  data!: [][]  ;
  dataExcel!: [][]
  ConfigForm !: FormGroup;

  // @Output() dataImported = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TeisImportComponent>,){}

  ngOnInit(){
    this.ConfigForm = this.formBuilder.group({
      // EURO: ['1'],
      MAD: ['', Validators.required],
      // fileExcel: ['', Validators.required],
      // Charged_Entity: ['2183', Validators.required],
      // Charged_Org_Name: ['2183', Validators.required]
    })
  }

  onFileChange(evt:any) {

    const target : DataTransfer = <DataTransfer> (evt.target);
    //throw error when the user try to upload more than one file
    if(target.files.length !== 1) throw new Error('cannot use multiple files') ;
      //To read the file
           const reader : FileReader = new FileReader();
      // unload files
       reader.onload = (e:any) =>{
        const bstr: string = e.target.result ;
        const wb: XLSX.WorkBook = XLSX.read(bstr , {type: 'binary'});

        const wsname : string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        console.log(ws);

        // ReStructring Data
        this.data = (XLSX.utils.sheet_to_json(ws,{header: 1  }));
        console.log(this.data);
        this.dataExcel = this.data

       }
        reader.readAsBinaryString(target.files[0]);
    }

    addBill(){
      if(this.ConfigForm.valid){
        console.log(this.ConfigForm.value);
        console.log(this.dataExcel)
        this.dialogRef.close(this.dataExcel)
      }
    }

}
