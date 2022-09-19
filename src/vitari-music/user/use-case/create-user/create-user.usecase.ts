import { GenericAppError } from "../../../../core/logic/app-error";
import { Either, left, Result, right } from "../../../../core/logic/result";
import { UseCase } from "../../../../core/use-cases/useCase";
import { User } from "../../domain/aggregate/user";
import { UserEmail } from "../../domain/value-object/user-email";
import { UserPassword } from "../../domain/value-object/user-password";
import { IUserRepository } from "../../infrastructure/repository/user.repository";
import { CreateUserErrors } from "./create-user-error";
import { CreateUserDto } from "./create-user.dto";

type Response = Either<
  | GenericAppError.UnexpectedError
  | CreateUserErrors.AccountAlreadyExists
  | Result<any>,
  Result<void>
>;

export class CreateUserUseCase
  implements UseCase<CreateUserDto, Promise<Response>>
{
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(request?: CreateUserDto): Promise<Response> {
    const { firstName, lastName, email, password } = request;
    const emailOrError = UserEmail.create(email);
    const passwordOrError = UserPassword.create({ value: password });

    const combinedPropsResult = Result.combine([emailOrError, passwordOrError]);
    if (combinedPropsResult.isFailure) {
      return left(Result.fail<void>(combinedPropsResult.error)) as Response;
    }
    const userOrError = User.create({
      email: emailOrError.getValue(),
      password: passwordOrError.getValue(),
      firstName,
      lastName,
      isEmailVerified: false,
    });

    if (userOrError.isFailure) {
      return left(Result.fail<void>(userOrError.error)) as Response;
    }

    const user: User = userOrError.getValue();
    const userAlreadyExists = await this.userRepository.exists(user.email);

    if (userAlreadyExists) {
      return left(
        new CreateUserErrors.AccountAlreadyExists(user.email.value)
      ) as Response;
    }

    try {
      await this.userRepository.save(user);
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
    return right(Result.ok<void>()) as Response;
  }
}
