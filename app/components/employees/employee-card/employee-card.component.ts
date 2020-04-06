import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Employee} from "../../../shared/models/employee.model";
import {EmployeeService} from "../../../shared/services/employee.service";

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['../employees.component.less']
})
export class EmployeeCardComponent implements OnInit {
  isWrongUrlImg: boolean = true;
  isOpenDeletePopup:boolean = false;

  @Input() staff: Employee;
  @Output() onReloadEvent = new EventEmitter;

  constructor(private readonly employeeService: EmployeeService) { }

  ngOnInit() {
  }

  onDeleteEmployee(): void {
    this.isOpenDeletePopup = !this.isOpenDeletePopup;
  }

  onDeleteEvent(): void {
    this.employeeService.onDeleteEmployee(this.staff);
    this.onReloadEvent.emit();
  }

  getFirstLetters(staff: Employee): string {
    return (staff.firstname[0] + staff.lastname[0]).toUpperCase();
  }

  getWorkPeriod(staff: Employee): string {
    let year = new Date().getFullYear() - new Date(staff.date).getFullYear();
    let month = new Date().getMonth() - new Date(staff.date).getMonth();

    if(month < 0 ) {
      year = year - 1;
      month = 12 + month;
    }

    return year
      ? year + ' year ' + (month ? month + ' month' : '')
      : month ? month + ' month' : 'less than a month';
  }
}
