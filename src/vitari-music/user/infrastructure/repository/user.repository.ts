import { Model } from "sequelize";
import { UniqueEntityId } from "../../../../core/domain/value-objects/uniqueEntityId";
import { Result } from "../../../../core/logic/result";
import { User } from "../../domain/aggregate/user";
import { UserEmail } from "../../domain/value-object/user-email";
import { UserPassword } from "../../domain/value-object/user-password";

export interface IUserRepository {
  findUserByEmail(email: UserEmail): Promise<User>;
  findUserByUsername(username: string): Promise<User>;
  exists(email: UserEmail): Promise<boolean>;
  save(user: User): Promise<void>;
}

export class UserRepository implements IUserRepository {
  private model: typeof Model;

  constructor(model?: typeof Model) {
    this.model = model;
  }

  private createBaseQuery() {}

  async findUserByEmail(email: UserEmail): Promise<User> {
    /*  const user = User.create(
      {
        firstName: "jose",
        lastName: "tandavala",
        email: UserEmail.create('"jose.tandavala@gmail.com"').getValue(),
        password: UserPassword.create({ value: '"1234"' }).getValue(),
        username: "tandavala",
      },
      new UniqueEntityId()
    );
    if (!!user === true) return Result.ok<void>(user);
 */
    return null;
  }
  findUserByUsername(username: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async exists(email: UserEmail): Promise<boolean> {
    return false;
  }
  async save(user: User): Promise<void> {
    console.log(user);
  }
}
