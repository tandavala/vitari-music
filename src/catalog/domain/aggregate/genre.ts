import { Entity } from "../../../core/domain/entity/entity";
import { UniqueEntityId } from "../../../core/domain/value-objects/uniqueEntityId";
import { Result } from "../../../core/result";
import { GenreId } from "../value-object/genreId";

interface GenreProps {
  value: string;
}

export class Genre extends Entity<GenreProps> {
  get id() {
    return this._id;
  }

  get genreId(): GenreId {
    return GenreId.create(this.id);
  }

  get value() {
    return this.props.value;
  }

  private constructor(props: GenreProps, id?: UniqueEntityId) {
    super(props, id);
  }

  public static create(name: string, id?: UniqueEntityId): Result<Genre> {
    if (!!name == false || name.length === 0) {
      return Result.fail<Genre>("Must provide genre name");
    }
    return Result.ok<Genre>(new Genre({ value: name }, id));
  }
}
