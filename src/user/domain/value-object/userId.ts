import { Entity } from "../../../core/domain/entity/entity";
import { UniqueEntityId } from "../../../core/domain/value-objects/uniqueEntityId";

export class UserId extends Entity<any> {
  get id() {
    return this._id;
  }

  private constructor(id?: UniqueEntityId) {
    super(null, id);
  }

  public static create(id?: UniqueEntityId) {
    return new UserId(id);
  }
}
