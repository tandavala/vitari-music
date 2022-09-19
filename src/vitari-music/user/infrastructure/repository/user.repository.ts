import { Model } from "sequelize";
import { User } from "../../domain/aggregate/user";
import { UserEmail } from "../../domain/value-object/user-email";

export interface IUserRepository {
  findUserByEmail(email: UserEmail): Promise<User>;
  findUserByUsername(username: string): Promise<User>;
  exists(email: UserEmail): Promise<boolean>;
  save(user: User): Promise<void>;
}

export class UserRepository implements IUserRepository {
  private model: typeof Model;

  constructor(model: typeof Model) {
    this.model = model;
  }

  private createBaseQuery() {}

  findUserByEmail(email: UserEmail): Promise<User> {
    throw new Error("Method not implemented.");
  }
  findUserByUsername(username: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  exists(email: UserEmail): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  save(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
