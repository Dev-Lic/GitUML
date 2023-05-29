import { Component, OnInit } from '@angular/core';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TeisInvoiceInputModule } from 'src/app/Modules/teis-invoice-input.module';
import { TEISService } from 'src/app/Services/teis.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-teis-import',
  templateUrl: './teis-import.component.html',
  styleUrls: ['./teis-import.component.scss']
})
export class TeisImportComponent implements OnInit{
  // data !: teisInvoices[]   ;
  data!: any[];
  headers!: string[];
  dataExcel: any[]=[]
  dataPost: TeisInvoiceInputModule[] =[]


  ConfigForm !: FormGroup;




  // @Output() dataImported = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TeisImportComponent>,private api:TEISService){}

  ngOnInit(){
    this.ConfigForm = this.formBuilder.group({
      MAD:[null,Validators.required]
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
            // console.log(this.data[index]);
            this.dataExcel.push(this.data[index])
            // console.log(this.dataExcel)
            // console.log(this.data[index][2]+" XX "+this.data[index][2]*2);
          }
        }
        // console.log(this.dataExcel[0].length)
        for (let index = 0; index < this.dataExcel.length; index++) {
          // this.dataPost[index].Billing_Org=this.dataExcel[index][0] : error cause the dataPost empty not intilized cant use this
          // this.dataPost[index].Billing_Org=this.dataExcel[index][0]

          const formData = new TeisInvoiceInputModule(
            this.dataExcel[index][0], // Billing_Org
            '', // Billing_Dept - Provide the appropriate value
            this.dataExcel[index][3], // Charged_Org
            '2183', // Charged_Org_Name
            'null', // Charged_Dep
            this.dataExcel[index][5], // Fiscal_Month
            this.dataExcel[index][6], // Charge_Type
            this.dataExcel[index][7], // Charge_Type_Description
            this.dataExcel[index][8], // Charge_Unit
            this.dataExcel[index][9], // Charge_Description
            this.dataExcel[index][10], // Charge_Amount
            this.dataExcel[index][11], // Billable_Amount
            this.dataExcel[index][12], // Hyperion_Profit_Center
            this.dataExcel[index][13], // SAP_Profit_Center
            this.dataExcel[index][14], // Charge_Category
            this.dataExcel[index][15], // Revenue_Type
            '2183', // Charged_entity
            2183, // Year
            'OCT' // Month
          );
          this.dataPost.push(formData);
        }
        // console.log(this.dataPost)
      }

        reader.readAsBinaryString(target.files[0]);
    }
    cpt:number = 0;
    addBill(){
      // if(this.ConfigForm.valid){
      //   console.log(this.ConfigForm.value);
      //   // console.log(this.dataExcel)
      //   // this.dialogRef.close(this.dataExcel)
      // }

      this.dataPost.forEach((element,index) => {
        const currentRow = index + 1;
        this.api.postTEIS(element).subscribe({
          next:(res)=>{
            // console.log("Product added N"+this.cpt);
            console.log("added : "+currentRow)
          },
          error:(err)=>{
            console.log("Product error N"+currentRow);
          },
        }
        )
      })
      this.api.triggerEvent()
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
