import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Employee} from "../models/employee.model";
import {Company} from "../models/company.model";

@Injectable({providedIn: 'root'})
export class EmployeeService {

  company: Company;

  constructor(private readonly authService: AuthService) {
  }

  onAddEmployee(employee: Employee): void {
    const companyName = this.authService.getCompany().name;
    this.authService.allCompanies.subscribe(c => {
      this.company = c.find(c => c.name === companyName);
      this.company.employee = [...this.company.employee || []];
      employee.id = new Date().getTime();
      this.company.employee.push(employee);
      this.authService.updateCompanies(this.company);
    })
  }

  onDeleteEmployee(employee: Employee): void {
    const companyName = this.authService.getCompany().name;
    this.authService.allCompanies.subscribe(c => {
      this.company = c.find(c => c.name === companyName);
      this.company.employee = this.company.employee.filter(e => e.id !== employee.id);
      this.authService.updateCompanies(this.company);
    });
  }
}
