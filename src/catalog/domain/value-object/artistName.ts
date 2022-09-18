import { ValueObject } from "../../../core/domain/value-objects/valueObject";
import { Result } from "../../../core/result";

interface ArtistNameProps {
  value: string;
}

export class ArtistName extends ValueObject<ArtistNameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: ArtistNameProps) {
    super(props);
  }

  public static create(name: string): Result<ArtistName> {
    if (!!name === false || name.length === 0) {
      return Result.fail<ArtistName>("Must provide an artist name");
    }
    return Result.ok<ArtistName>(new ArtistName({ value: name }));
  }
}
