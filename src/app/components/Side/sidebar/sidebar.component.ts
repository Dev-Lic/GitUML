import { Component } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/Services/auth-guard.service';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  showInvoiceList: boolean = false;
  isauthenticated = false 




  constructor(private auth: UserService, private router:Router){}
  


  ngOnInit(): void {
    this.auth.isUserLoggedIn$.subscribe((isLoggedIn)=>{
         this.isauthenticated = isLoggedIn;
    })
  }

  toggleInvoiceList() {
    this.showInvoiceList = !this.showInvoiceList;
  }

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, false);
  }

}
