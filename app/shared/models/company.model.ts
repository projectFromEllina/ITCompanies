import {BaseNamedEntity} from './base-named-entity';
import {Goal} from './goal.model';
import {Employee} from './employee.model';

export interface Company extends BaseNamedEntity {
  password: any;
  img?: string;
  about?: string;
  employee?: Array<Employee>;
  goals?: Array<Goal>;
}
