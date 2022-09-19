import { Entity } from "../../../../core/domain/entity/entity";
import { UniqueEntityId } from "../../../../core/domain/value-objects/uniqueEntityId";
import { Guard } from "../../../../core/logic/guard";
import { Result } from "../../../../core/logic/result";
import { TraderId } from "../../../trading/domain/value-object/traderId";
import { VitariCollection } from "./vitari";

interface CatalogProps {
  tradeId: TraderId;
  items: VitariCollection;
}

export class Catalog extends Entity<CatalogProps> {
  private constructor(props: CatalogProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(
    props: CatalogProps,
    id?: UniqueEntityId
  ): Result<Catalog> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.tradeId, argumentName: "tradeId" },
      { argument: props.items, argumentName: "items" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Catalog>(guardResult.message);
    }
    return Result.ok<Catalog>(new Catalog(props, id));
  }
}
