import { UniqueEntityId } from "../value-objects/uniqueEntityId";

export interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityId;
}
