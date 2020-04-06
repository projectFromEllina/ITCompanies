import {Component, EventEmitter, OnDestroy, OnInit, Output, Input, OnChanges} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Goal} from "../../shared/models/goal.model";
import {Company} from "../../shared/models/company.model";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from 'rxjs';
import {sortBy} from "../../shared/utils/collection-helper";
import {GoalsStatusEnum} from "../../shared/enum/goals-status.enum";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.less']
})
export class GoalsComponent implements OnChanges {
  isOpenWizard: boolean = false;
  isShowLoader: boolean = true;
  goals: Goal[];
  goal: Goal;
  maxNumberOfGoals: number = 5;

  @Input() company: Company;
  @Input() isOwnPage: boolean;
  @Output() onSetNewGoalEvent = new EventEmitter;

  constructor() {
  }

  ngOnChanges() {
    this.load();
  }

  onSetGoalEvent() {
    this.isShowLoader = true;
    setTimeout(() => {
      this.load();
      this.isShowLoader = false;
      this.onSetNewGoalEvent.emit();
    }, 3000);
  }

  load(): void {
    if(!this.company) {
      return;
    }
    this.goals = sortBy(sortBy(this.company.goals || [],
      'createdDate', (a, b) => a > b), 'status');
    this.isShowLoader = false;
  }

  onOpenWizard() {
    if (this.isNotSetGoal) {
      return;
    }
    this.goal = null;
    this.isOpenWizard = true;
  }

  onEditGoal(goal: Goal) {
    this.goal = goal;
    this.isOpenWizard = true;
  }

  get isNotSetGoal(): boolean {
    if (!this.goals) {
      return;
    }

    return this.goals
      .filter(g => g.status === GoalsStatusEnum.New).length >= this.maxNumberOfGoals;
  }

  get setEmptyMessage(): string {
    if (!this.company) {
      return;
    }

    return this.isOwnPage ? 'You haven\'t set any goals' : `The company ${this.company.name} hasn\'t goals`;
  }
}
