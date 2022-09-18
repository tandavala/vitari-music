import { DomainEvent } from "../events/domain-event";
import { IDomainEvent } from "../events/domain-event.interface";
import { UniqueEntityId } from "../value-objects/uniqueEntityId";
import { Entity } from "./entity";

export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: IDomainEvent[] = [];

  get id(): UniqueEntityId {
    return this._id;
  }

  get domainEvents(): IDomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvent.markAggregateForDispatch(this);
    this.logDomainEventAdd(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents.splice(0, this._domainEvents.length);
  }
  private logDomainEventAdd(domainEvent: IDomainEvent): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const domainEventClass = Reflect.getPrototypeOf(domainEvent);
    console.log(
      `[Domain Event Created]:`,
      thisClass.constructor.name,
      "==>",
      domainEventClass.constructor.name
    );
  }
}
