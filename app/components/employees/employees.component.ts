import { Component, OnInit } from '@angular/core';
import {Employee} from "../../shared/models/employee.model";
import {EmployeeService} from "../../shared/services/employee.service";
import { sortBy } from '../../shared/utils/collection-helper';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.less']
})
export class EmployeesComponent implements OnInit {
  isShowLoader: boolean = true;
  isOpenWizard: boolean = false;
  searchName: string = '';
  employees: Employee[] = [];
  filterEmployees: Employee[] = [];

  constructor(private readonly employeeService: EmployeeService,
              private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    const companyName = this.authService.getCompany().name;
    this.authService.allCompanies.subscribe(c => {
      this.employees = sortBy(c.find(c => c.name === companyName)
        .employee || [], 'firstname');
      this.filterEmployees = this.employees;
      this.isShowLoader = false;
    });
  }

  onSearchEmployee(): void {
    if(!this.searchName.length) {
      this.filterEmployees = this.employees;
    }

    this.filterEmployees = this.employees.filter(e =>
      (e.firstname + ' ' + e.lastname).toLowerCase().indexOf(this.searchName.toLowerCase()) !== -1);
  }

  onCloseSearching(): void {
    this.searchName = '';
    this.onSearchEmployee();
  }

  onChangeEmployees(): void {
    this.isShowLoader = true;
    setTimeout(() => {
      this.searchName = '';
      this.load();
    }, 3000);
  }

  onOpenWizard (): void {
    this.isOpenWizard = true;
  }

  onCloseEvent(): void {
    this.isOpenWizard = false;
  }
}
