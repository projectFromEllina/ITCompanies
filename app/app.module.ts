import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ClickOutsideModule} from 'ng-click-outside';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {SharedModule} from './shared/shared.module';
import {MainComponent} from './components/main.component';
import {CompanyComponent} from './components/company/company.component';
import {GoalsComponent} from './components/goals/goals.component';
import {GoalBlockComponent} from './components/goals/goal-block/goal-block.component';
import {GoalWizardComponent} from './components/goals/goal-wizard/goal-wizard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeWizardComponent } from './components/employees/employee-wizard/employee-wizard.component';
import { EmployeeCardComponent } from './components/employees/employee-card/employee-card.component';
import { AllCompaniesComponent } from './components/all-companies/all-companies.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    CompanyComponent,
    GoalsComponent,
    GoalBlockComponent,
    GoalWizardComponent,
    EmployeesComponent,
    EmployeeWizardComponent,
    EmployeeCardComponent,
    AllCompaniesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    ClickOutsideModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
