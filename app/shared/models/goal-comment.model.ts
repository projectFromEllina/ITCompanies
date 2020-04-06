import {BaseEntity} from "./base-entity";
import {CompanyCreator} from "./company-creator.models";

export interface GoalComment extends BaseEntity {
  companyCreator: CompanyCreator;
  date: Date;
  text: string;
}
