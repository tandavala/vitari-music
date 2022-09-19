import { AggregateRoot } from "../../../../core/domain/entity/aggregateRoot";
import { UniqueEntityId } from "../../../../core/domain/value-objects/uniqueEntityId";
import { UserId } from "../../../user/domain/value-object/userId";

interface TraderProps {
  userId: UserId;
  reputation: number;
}

export class Trader extends AggregateRoot<TraderProps> {
  private constructor(props: TraderProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public create(props: TraderProps, id?: UniqueEntityId) {
    return null;
  }
}
