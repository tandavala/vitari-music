import { DomainEvent } from "../../../core/domain/events/domain-event";
import { UniqueEntityId } from "../../../core/domain/value-objects/uniqueEntityId";
import models from "../models";

const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
  const aggregateId = new UniqueEntityId(model[primaryKeyField]);
  DomainEvent.dispatchEventsForAggregate(aggregateId);
};

(async function createHooksForAggregateRoots() {
  const { BaseUser } = models;

  BaseUser.addHook("afterCreate", (m: any) =>
    dispatchEventsCallback(m, "base_user_id")
  );
  BaseUser.addHook("afterDestroy", (m: any) =>
    dispatchEventsCallback(m, "base_user_id")
  );
  BaseUser.addHook("afterUpdate", (m: any) =>
    dispatchEventsCallback(m, "base_user_id")
  );
  BaseUser.addHook("afterSave", (m: any) =>
    dispatchEventsCallback(m, "base_user_id")
  );
  BaseUser.addHook("afterUpsert", (m: any) =>
    dispatchEventsCallback(m, "base_user_id")
  );
})();
