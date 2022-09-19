import * as bcrypt from "bcrypt-nodejs";
import { ValueObject } from "../../../../core/domain/value-objects/valueObject";
import { Guard } from "../../../../core/logic/guard";
import { Result } from "../../../../core/logic/result";

interface UserPasswordProps {
  value: string;
  hashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props) {
    super(props);
  }

  public static create(props: UserPasswordProps): Result<UserPassword> {
    const propsResult = Guard.againstNullOrUndefined(props.value, "password");
    if (!propsResult.succeeded) {
      return Result.fail<UserPassword>(propsResult.message);
    }
    if (!props.hashed && !this.isAppropriateLength(props.value)) {
      return Result.fail<UserPassword>(
        "Password doesn't meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min]"
      );
    }
    return Result.ok<UserPassword>(
      new UserPassword({ value: props.value, hashed: !!props.hashed === true })
    );
  }

  public async comparePassword(plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    }
    return this.props.value === plainTextPassword;
  }

  public isAlreadyHashed(): boolean {
    return this.props.hashed;
  }

  private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hashed, (err, comparedResult) => {
        if (err) return resolve(false);
        return resolve(comparedResult);
      });
    });
  }

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  }

  public getHashedValue(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      }
      return resolve(this.hashPassword(this.props.value));
    });
  }

  public static isAppropriateLength(value: string): boolean {
    return value.length >= 8;
  }
}
