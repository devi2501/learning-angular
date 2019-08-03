import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuitabilityInboxComponent } from './components/suitability-inbox/suitability-inbox.component';


const routes: Routes = [{path:"",component:SuitabilityInboxComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
