import { AggregateRoot } from "../../../../core/domain/entity/aggregateRoot";
import { UniqueEntityId } from "../../../../core/domain/value-objects/uniqueEntityId";
import { Guard } from "../../../../core/logic/guard";
import { Result } from "../../../../core/logic/result";
import { TraderId } from "../../../trading/domain/value-object/traderId";
import { VitariCreatedEvent } from "../event/vitari-created-event";
import { VitariNotes } from "../value-object/vitari-note";
import { VitariId } from "../value-object/vitariId";
import { Album } from "./album";
import { Artist } from "./artist";

interface VitariProps {
  traderId: TraderId;
  artist: Artist;
  album: Album;
  vitariNotes?: VitariNotes;
  dateAdded?: Date;
}

export type VitariCollection = Vitari[];

export class Vitari extends AggregateRoot<VitariProps> {
  get vitariId(): VitariId {
    return VitariId.create(this.id);
  }
  get artist(): Artist {
    return this.props.artist;
  }

  get album(): Album {
    return this.props.album;
  }

  get dateAdded(): Date {
    return this.props.dateAdded;
  }

  get traderId(): TraderId {
    return this.props.traderId;
  }

  get vitariNotes() {
    return this.props.vitariNotes;
  }

  private constructor(props: VitariProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(
    props: VitariProps,
    id?: UniqueEntityId
  ): Result<Vitari> {
    const propsResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.album, argumentName: "album" },
      { argument: props.artist, argumentName: "artist" },
      { argument: props.traderId, argumentName: "traderId" },
    ]);

    if (!propsResult.succeeded) {
      return Result.fail<Vitari>(propsResult.message);
    }

    const vitari = new Vitari({
      ...props,
      dateAdded: props.dateAdded ? props.dateAdded : new Date(),
    });
    const isNewlyCreated = !!id === false;
    if (isNewlyCreated) {
      vitari.addDomainEvent(new VitariCreatedEvent(vitari.vitariId));
    }
    return Result.ok<Vitari>(vitari);
  }
}
