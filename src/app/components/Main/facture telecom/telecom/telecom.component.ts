import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TelecomImportComponent } from '../telecom-import/telecom-import.component';
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TEISService } from 'src/app/Services/teis.service';

@Component({
  selector: 'app-telecom',
  templateUrl: './telecom.component.html',
  styleUrls: ['./telecom.component.scss']
})
export class TelecomComponent {
  displayedColumns: string[] = ['NOM', 'Codeclient', 'LIB PLAN', 'NUM_IDENT', 'Cycle', 'Ohrefnum',
   'Num Tel', 'Abonnement', 'Remise Osm', 'Options', 'Frais De Souscription', 'Equipement', 'Frais Ponctuel',
    'Frais Ponctuel Client', 'Promotions', 'Recharge Sur Facture', 'Usage', 'MHT', 'TVA', 'M TTC'];

    constructor(public dialog: MatDialog,private api:TEISService) { }


    ngOnInit(): void {
      this.getAllTeis();
}


  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getAllTeis(){
    this.api.getTEIS()
    .subscribe(
      (res: any[] | undefined)=>{
        console.log(res)
        this.dataSource= new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      ()=>{alert("Error while fetching product")}
    );
  }


  openDialog() {
    this.dialog.open(TelecomImportComponent, {
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
