import { Component } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  showInvoiceList: boolean = false;

  toggleInvoiceList() {
    this.showInvoiceList = !this.showInvoiceList;
  }

}
