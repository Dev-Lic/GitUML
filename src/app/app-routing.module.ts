import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './components/Main/dashboard/general/general.component';
import { TEISComponent } from './components/Main/facture TEIS/teis/teis.component';
import { TelecomComponent } from './components/Main/facture telecom/telecom/telecom.component';
import { LoginComponent } from './components/Main/login';
import { AuthGuardService} from "./Services/auth-guard.service";


const routes: Routes = [
  {path:"", component: GeneralComponent, canActivate:[AuthGuardService]},
  {path:"TEIS", component: TEISComponent , canActivate:[AuthGuardService]},
  {path:"Telecom", component: TelecomComponent , canActivate:[AuthGuardService]},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
