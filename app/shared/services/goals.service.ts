import {Injectable} from "@angular/core";
import {Goal} from "../models/goal.model";
import {AuthService} from "./auth.service";
import {GoalsStatusEnum} from "../enum/goals-status.enum";
import {GoalComment} from "../models/goal-comment.model";
import {Company} from "../models/company.model";

@Injectable({providedIn: 'root'})
export class GoalsService {

  constructor(private readonly authService: AuthService) {
  }

  setGoal(company: Company, goal: Goal, comment?: GoalComment): void {
    company.goals = [...company.goals || []];
    goal.comments = [...goal.comments || []];
    const goalIndex = company.goals.findIndex(g => g.id === goal.id);

    if(goalIndex === -1 ) {
      goal.id = company.goals.length;
      goal.status = GoalsStatusEnum.New;
      company.goals.push(goal);
    }
    if (comment) {
      comment.id = goal.comments.length;
      goal.comments.push(comment);
    }

    company.goals[goalIndex] = goal;

    this.authService.updateCompanies(company);
  }
}
