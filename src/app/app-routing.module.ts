import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerFormComponent } from './Pages/customer-form/customer-form.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/customer',
    pathMatch: 'full'
  },
  {
    path: 'customer',component:CustomerFormComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
