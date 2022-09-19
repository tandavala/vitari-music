import { ValueObject } from "../../../../core/domain/value-objects/valueObject";
import { Guard } from "../../../../core/guard";
import { Result } from "../../../../core/result";

interface VitariNotesProps {
  html: string;
}

export class VitariNotes extends ValueObject<VitariNotesProps> {
  public static NOTES_MAX_LENGTH = 10000;

  get value(): string {
    return this.props.html;
  }

  private constructor(props: VitariNotesProps) {
    super(props);
  }

  public static create(html: string): Result<VitariNotes> {
    const guardResult = Guard.againstNullOrUndefined(html, "html");

    if (!guardResult.succeeded) {
      return Result.fail<VitariNotes>(guardResult.message);
    }
    if (html.length >= VitariNotes.NOTES_MAX_LENGTH) {
      return Result.fail<VitariNotes>("Max length exceeded");
    }

    return Result.ok<VitariNotes>(new VitariNotes({ html }));
  }
}
