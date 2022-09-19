import { IDomainEvent } from "../../../../core/domain/events/domain-event.interface";
import { UniqueEntityId } from "../../../../core/domain/value-objects/uniqueEntityId";
import { VitariId } from "../value-object/vitariId";

export class VitariCreatedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  public vitariId: VitariId;

  constructor(vitariId: VitariId) {
    this.vitariId = vitariId;
  }

  getAggregateId(): UniqueEntityId {
    return this.vitariId.id;
  }
}
