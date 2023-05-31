import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { MatDialog } from '@angular/material/dialog';

import * as XLSX from 'xlsx';
import { teisInvoices } from 'src/app/Modules/teisInvoices.module';
import { TEISService } from 'src/app/Services/teis.service';
import { TeisImportComponent } from '../teis-import/teis-import.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teis',
  templateUrl: './teis.component.html',
  styleUrls: ['./teis.component.scss']
})
export class TEISComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Billing_Org', 'Billing_Dept', 'Charged_Org',
  'Charged_Org_Name', 'Charged_Dep', 'Fiscal_Month', 'Charge_Type', 'Charge_Type_Description','Charge_Unit',
  'Charge_Amount', 'Billable_Amount','Hyperion_Profit_Center','SAP_Profit_Center',
  'Charged_Category','Revenue_Type','Charged_entity','Year','Month'];

    teisInvoices!: teisInvoices[];


    constructor(public dialog: MatDialog,private api:TEISService) { }

    private eventSubscription!: Subscription;
    ngOnInit(): void {
      this.getAllTeis();
      this.eventSubscription =this.api.event$.subscribe(event => {
        if (event) {
          this.getAllTeis()
        }
      })
    }

    ngOnDestroy(): void {
      if (this.eventSubscription) {
        this.eventSubscription.unsubscribe();
      }
    }


  dataSource!: MatTableDataSource<teisInvoices>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getAllTeis(){
      this.api.getTEIS()
      .subscribe(
        res=>{
          this.teisInvoices = res;
          console.log(res)
          this.dataSource= new MatTableDataSource(this.teisInvoices);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        err=>{console.warn("Error while fetching product")}
      );
  }


  openDialog() {
    this.dialog.open(TeisImportComponent, {
      width:'50%',
      height:'65%'
    }).afterClosed().subscribe(result => {
      console.log(result);
    });;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  fileName= 'ExcelSheet.xlsx';
//eXPORT PART
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }

}
