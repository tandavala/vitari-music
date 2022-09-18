import { IDomainEvent } from "../../../core/domain/events/domain-event.interface";
import { UniqueEntityId } from "../../../core/domain/value-objects/uniqueEntityId";
import { User } from "../aggregate/user";

export class UserCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.user = user;
  }
  public getAggregateId(): UniqueEntityId {
    return this.user.id;
  }
}
