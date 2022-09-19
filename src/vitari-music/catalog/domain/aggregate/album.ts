import { Entity } from "../../../../core/domain/entity/entity";
import { UniqueEntityId } from "../../../../core/domain/value-objects/uniqueEntityId";
import { Guard } from "../../../../core/guard";
import { Result } from "../../../../core/result";
import { AlbumId } from "../value-object/albumId";
import { ArtistId } from "../value-object/artistId";
import { Genre } from "./genre";

interface AlbumProps {
  name: string;
  artistId: ArtistId;
  yearReleased?: number;
  genres?: Genre[];
  artwork?: string;
}

export class Album extends Entity<AlbumProps> {
  public static MAX_NUMBER_GENRES_PER_ALBUM = 3;

  get id(): UniqueEntityId {
    return this._id;
  }
  get albumId(): AlbumId {
    return AlbumId.create(this.id);
  }
  get artistId(): ArtistId {
    return this.props.artistId;
  }

  get name(): string {
    return this.props.name;
  }
  get genres(): Genre[] {
    return this.props.genres;
  }

  get yearReleased(): number {
    return this.props.yearReleased;
  }

  get artWork(): string {
    return this.props.artwork;
  }

  public addGenre(genre: Genre): void {
    const maxLengthExceeded =
      this.props.genres.length >= Album.MAX_NUMBER_GENRES_PER_ALBUM;
    const alreadyAdded = this.props.genres.find((g) => g.id.equals(genre.id));
    if (!alreadyAdded && !maxLengthExceeded) {
      this.props.genres.push(genre);
    }
  }

  public removeGenre(genre: Genre): void {
    this.props.genres = this.props.genres.filter((g) => !g.id.equals(genre.id));
  }

  public static create(props: AlbumProps, id?: UniqueEntityId): Result<Album> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: "name" },
      { argument: props.artistId, argumentName: "artistId" },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Album>(guardResult.message);
    }
    return Result.ok<Album>(
      new Album({ ...props, genres: props.genres ? props.genres : [] })
    );
  }
}
