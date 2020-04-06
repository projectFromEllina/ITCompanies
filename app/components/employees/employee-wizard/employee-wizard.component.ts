import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {positions} from "../../../shared/utils/positions";
import {Employee} from "../../../shared/models/employee.model";
import {EmployeeService} from "../../../shared/services/employee.service";

@Component({
  selector: 'app-employee-wizard',
  templateUrl: './employee-wizard.component.html',
  styleUrls: ['../employees.component.less']
})
export class EmployeeWizardComponent implements OnInit {
  bsInlineValue: Date;
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  isOpenSelector: boolean = false;
  allPositions = positions;
  employee: Employee = {} as Employee;
  @Input() isOpenWizard: boolean = false;

  @Output() onCloseEvent = new EventEmitter();
  @Output() onAddEmployeeEvent = new EventEmitter();

  @ViewChild('wizard', {static: false}) wizard: ElementRef;


  constructor(private readonly employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.bsInlineValue = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  onClose(): void {
    this.employee = {} as Employee;
    this.onDateSelect(new Date());
    this.isOpenWizard = false;
    this.onCloseEvent.emit();
    this.scrollToTop();
  }

  onDateSelect(date: Date) {
    this.bsInlineValue = date;
    this.employee.date = date;
  }

  onAddEmployee(): void {
    this.employee.firstname = this.employee.firstname[0].toUpperCase() + this.employee.firstname.substring(1);
    this.employee.lastname = this.employee.lastname[0].toUpperCase() + this.employee.lastname.substring(1);
    this.employeeService.onAddEmployee(this.employee);
    this.onClose();
    this.onAddEmployeeEvent.emit();
  }

  onPositionSelect(position: string) {
    this.employee.position = position;
  }

  scrollToTop(): void {
    try {
      this.wizard.nativeElement.scrollTop = 0;
    } catch (err) {}
  }

  get isValid(): boolean {
    return this.employee.firstname
      && this.employee.lastname
      && this.employee.position
      && this.employee.date <= new Date();
  }
}
