import { AggregateRoot } from "../../../core/domain/entity/aggregateRoot";
import { UniqueEntityId } from "../../../core/domain/value-objects/uniqueEntityId";
import { Guard } from "../../../core/guard";
import { Result } from "../../../core/result";
import { UserCreatedEvent } from "../event/user-created-event";
import { UserEmail } from "../value-object/user-email";
import { UserPassword } from "../value-object/user-password";
import { UserId } from "../value-object/userId";

interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: UserPassword;
  isEmailVerified: boolean;
  profilePicture?: string;
  googleId?: number;
  facebookId?: number;
  username: string;
}
export class User extends AggregateRoot<UserProps> {
  get id(): UniqueEntityId {
    return this._id;
  }

  get userId(): UserId {
    return User.caller(this.id);
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get isEmailVerified(): boolean {
    return this.props.isEmailVerified;
  }

  get googleId(): number {
    return this.props.googleId;
  }

  get facebookId(): number {
    return this.props.facebookId;
  }

  get username(): string {
    return this.props.username;
  }
  set username(value: string) {
    this.props.username = value;
  }

  private constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  private static isRegisteringWithGoogle(props: UserProps): boolean {
    return !!props.facebookId === true;
  }

  private static isRegisteringWithFacebook(props: UserProps): boolean {
    return !!props.facebookId === true;
  }

  public static create(props: UserProps, id?: UniqueEntityId): Result<User> {
    const guardedProps = [
      { argument: props.firstName, argumentName: "firstName" },
      { argument: props.lastName, argumentName: "lastName" },
      { argument: props.email, argumentName: "email" },
      { argument: props.isEmailVerified, argumentName: "isEmailVerified" },
    ];

    if (
      !this.isRegisteringWithGoogle(props) &&
      !this.isRegisteringWithFacebook(props)
    ) {
      guardedProps.push({ argument: props.password, argumentName: "password" });
    }
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message);
    }
    const user = new User(
      {
        ...props,
        username: props.username ? props.username : "",
      },
      id
    );
    const idWasProvided = !!id;
    if (!idWasProvided) {
      user.addDomainEvent(new UserCreatedEvent(user));
    }
    return Result.ok<User>(user);
  }
}
