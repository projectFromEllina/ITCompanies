import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthComponent} from "./auth/auth.component";
import {CompanyComponent} from "./components/company/company.component";
import {MainComponent} from "./components/main.component";
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {EmployeesComponent} from "./components/employees/employees.component";
import { AllCompaniesComponent } from './components/all-companies/all-companies.component';


const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: 'company/:name', component: CompanyComponent},
      {path: 'employees', component: EmployeesComponent},
      {path: 'companies', component: AllCompaniesComponent},
    ]
  },
  {path: 'authorization', component: AuthComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
