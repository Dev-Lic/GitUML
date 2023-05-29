import { Component } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  showInvoiceList: boolean = false;
  constructor(private router:Router){}
  toggleInvoiceList() {
    this.showInvoiceList = !this.showInvoiceList;
  }

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

}
