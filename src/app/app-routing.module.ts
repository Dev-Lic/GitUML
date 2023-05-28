import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralComponent } from './components/Main/dashboard/general/general.component';
import { TEISComponent } from './components/Main/facture TEIS/teis/teis.component';
import { TelecomComponent } from './components/Main/facture telecom/telecom/telecom.component';

const routes: Routes = [
  // {path:"", component: GeneralComponent},
  // {path:"/TEIS", component: TEISComponent},
  // {path:"/Telecom", component: TelecomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
