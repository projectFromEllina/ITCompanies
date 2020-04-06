import {BaseEntity} from './base-entity';

export interface Employee extends BaseEntity {
  firstname: string;
  lastname: string;
  date: Date;
  photo: string;
  position: string;
}
