import {BaseEntity} from "./base-entity";

export interface Likes extends BaseEntity{
  positive: number;
  negative: number;
}
