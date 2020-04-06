import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GoalsTypesEnum} from "../../../shared/enum/goals-types.enum";
import {getEnumDescription} from '../../../shared/utils/enum-helper';
import {Goal} from "../../../shared/models/goal.model";
import {GoalsService} from "../../../shared/services/goals.service";
import {addDaysToDate} from "../../../shared/utils/add-days-to-date";
import { Company } from '../../../shared/models/company.model';

@Component({
  selector: 'app-goal-wizard',
  templateUrl: './goal-wizard.component.html',
  styleUrls: ['../goals.component.less']
})
export class GoalWizardComponent implements OnInit {
  bsInlineValue: Date;
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  edit: boolean;
  description: string = '';
  type: GoalsTypesEnum = GoalsTypesEnum.Short;

  readonly goalMaxLength = 300;
  readonly shortType = GoalsTypesEnum.Short;
  readonly middleType = GoalsTypesEnum.Middle;
  readonly longType = GoalsTypesEnum.Long;

  @Input() isOpenWizard: boolean;
  @Input() goal: Goal;
  @Input() company: Company;
  @Output() onCloseEvent = new EventEmitter;
  @Output() onSetGoalEvent = new EventEmitter;

  constructor(private readonly goalsService: GoalsService) {
  }

  ngOnInit() {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];

    this.load();
  }

  onClose() {
    this.goal = null;
    this.description = '';
    this.type = GoalsTypesEnum.Short;
    this.onDateSelect(new Date());
    this.bsInlineValue = new Date();
    this.onCloseEvent.emit();
  }

  load(): void {
    this.onDateSelect(addDaysToDate(new Date(), 5));
    this.edit = !!this.goal;

    if (this.edit) {
      this.description = this.goal.description;
      this.type = this.goal.type;
      this.bsInlineValue = new Date(this.goal.deadline);
    }
  }

  onSetGoal(): void {
    const originalGoal: Goal = this.goal || {} as Goal;
    const goal = {
      ...originalGoal,
      description: this.description,
      type: this.type,
      createdDate: new Date(),
      deadline: this.bsInlineValue
    } as Goal;

    this.goalsService.setGoal(this.company, goal);
    this.onClose();
    this.onSetGoalEvent.emit();
  }

  onDateSelect(date: Date) {
    this.bsInlineValue = date;
  }

  onChangeDate() {
    switch (this.type) {
      case GoalsTypesEnum.Short:
        this.onDateSelect(addDaysToDate(new Date(), 5));
        break;
      case GoalsTypesEnum.Middle:
        this.onDateSelect(addDaysToDate(new Date(), 10));
        break;
      case GoalsTypesEnum.Long:
        this.onDateSelect(addDaysToDate(new Date(), 15));
        break;
      default: break;
    }
  }

  getNameTypes(type: GoalsTypesEnum): string {
    return getEnumDescription(type, GoalsTypesEnum);
  }

  get isValid(): boolean {
    return this.description.length && this.bsInlineValue > new Date();
  }
}
