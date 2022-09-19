import { Entity } from "../../../../core/domain/entity/entity";
import { UniqueEntityId } from "../../../../core/domain/value-objects/uniqueEntityId";
import { Guard } from "../../../../core/guard";
import { Result } from "../../../../core/result";
import { TraderId } from "../../../trading/domain/value-object/traderId";
import { Vitari, VitariCollection } from "./vitari";

interface WishListProps {
  traderId: TraderId;
  items: VitariCollection;
}

export class WishList extends Entity<WishListProps> {
  private constructor(props: WishListProps, id?: UniqueEntityId) {
    super(props, id);
  }

  private alreadyAdded(vitari: Vitari): boolean {
    const found = this.props.items.find((v) => v.id.equals(vitari.id));
    return !!found === true;
  }

  public addItem(vitari: Vitari): void {
    if (!this.alreadyAdded(vitari)) {
      this.props.items.push(vitari);
    }
  }
  public static create(
    props: WishListProps,
    id?: UniqueEntityId
  ): Result<WishList> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.traderId, argumentName: "tradeId" },
      { argument: props.items, argumentName: "items" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<WishList>(guardResult.message);
    }
    return Result.ok<WishList>(new WishList(props, id));
  }
}
