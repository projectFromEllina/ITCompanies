import {BaseNamedEntity} from './base-named-entity';
import {GoalsTypesEnum} from '../enum/goals-types.enum';
import {Likes} from './likes.model';
import {GoalComment} from './goal-comment.model';
import {GoalsStatusEnum} from '../enum/goals-status.enum';

export interface Goal extends BaseNamedEntity {
  status: GoalsStatusEnum;
  description: string;
  createdDate: Date;
  deadline: Date;
  type: GoalsTypesEnum;
  comments?: Array<GoalComment>;
  likes?: Array<Likes>;
}
