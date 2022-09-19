import { UniqueEntityId } from "../../../core/domain/value-objects/uniqueEntityId";
import { Mapper } from "../../../core/infrastructure/mapper";
import { User } from "../domain/aggregate/user";
import { UserEmail } from "../domain/value-object/user-email";
import { UserPassword } from "../domain/value-object/user-password";

export class UserMap extends Mapper<User> {
  public static toPersistence(user: User): any {
    return {
      base_user_id: user.id.toString(),
      user_email: user.email.value,
      user_password: user.password.value,
      first_name: user.firstName,
      last_name: user.lastName,
      is_email_verified: user.isEmailVerified,
      username: user.username,
    };
  }

  public static toDomain(raw: any): User {
    const userEmailOrError = UserEmail.create(raw.user_email);
    const userPasswordOrError = UserPassword.create(raw.user_password);

    const userOrError = User.create(
      {
        email: userEmailOrError.getValue(),
        password: userPasswordOrError.getValue(),
        firstName: raw.first_name,
        lastName: raw.last_name,
        isEmailVerified: raw.is_email_verified,
        username: raw.user_email,
      },
      new UniqueEntityId(raw.base_user_id)
    );
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }
}
