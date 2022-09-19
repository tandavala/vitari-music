import { Entity } from "../../../../core/domain/entity/entity";
import { UniqueEntityId } from "../../../../core/domain/value-objects/uniqueEntityId";
import { Guard } from "../../../../core/logic/guard";
import { Result } from "../../../../core/logic/result";
import { ArtistId } from "../value-object/artistId";
import { ArtistName } from "../value-object/artistName";
import { Genre } from "./genre";

interface ArtistProps {
  name: ArtistName;
  genres: Genre[];
}

export class Artist extends Entity<ArtistProps> {
  public static MAX_NUMBER_GENRES_PER_ARTIST = 5;

  get id() {
    return this._id;
  }

  get artistId(): ArtistId {
    return ArtistId.create(this.id);
  }

  get name(): ArtistName {
    return this.props.name;
  }

  get genres(): Genre[] {
    return this.props.genres;
  }

  public addGenre(genre: Genre): void {
    const maxLengthExceeded =
      this.props.genres.length >= Artist.MAX_NUMBER_GENRES_PER_ARTIST;
    const alreadyAdded = this.props.genres.find((g) => g.id.equals(genre.id));
    if (!alreadyAdded && !maxLengthExceeded) {
      this.props.genres.push(genre);
    }
  }

  public removeGenre(genre: Genre): void {
    this.props.genres = this.props.genres.filter((g) => !g.id.equals(genre.id));
  }

  private constructor(props: ArtistProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(
    props: ArtistProps,
    id?: UniqueEntityId
  ): Result<Artist> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: "name" },
      { argument: props.genres, argumentName: "genres" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Artist>(guardResult.message);
    }
    return Result.ok<Artist>(
      new Artist({
        ...props,
        genres: Array.isArray(props.genres) ? props.genres : [],
      })
    );
  }
}
