import { AggregateRoot } from "../../../core/domain/entity/aggregateRoot";

interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export class User extends AggregateRoot<UserProps> {
  get id() {
    return this._id;
  }
}
