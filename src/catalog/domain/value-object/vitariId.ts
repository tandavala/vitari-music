import { Entity } from "../../../core/domain/entity/entity";
import { UniqueEntityId } from "../../../core/domain/value-objects/uniqueEntityId";

export class VitariId extends Entity<any> {
  get id(): UniqueEntityId {
    return this._id;
  }

  private constructor(id?: UniqueEntityId) {
    super(null, id);
  }

  public static create(id?: UniqueEntityId): VitariId {
    return new VitariId(id);
  }
}
