import { BaseEntity } from './base-entity';

export interface BaseNamedEntity extends BaseEntity {
    name: string;
}
