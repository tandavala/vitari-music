import { BaseController } from "../../../../core/infrastructure/base-controller";
import { CreateUserErrors } from "./create-user-error";
import { CreateUserDto } from "./create-user.dto";
import { CreateUserUseCase } from "./create-user.usecase";

export class CreateUserController extends BaseController {
  private useCase: CreateUserUseCase;
  constructor(useCase: CreateUserUseCase) {
    super();
    this.useCase = useCase;
  }

  protected async executeImpl(): Promise<any> {
    const dto: CreateUserDto = this.req.body as CreateUserDto;

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case CreateUserErrors.AccountAlreadyExists:
            return this.conflict(error.getValue().message);
          default:
            return this.clientError(error.getValue());
        }
      }
    } catch (err) {}

    /*  return this.res.status(201).json({ message: result. }); */

    /* try {
      

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case CreateUserErrors.AccountAlreadyExists:
            return this.conflict(error.getValue().message);
          default:
            return this.fail(error.getValue().message);
        }
      }
      return this.ok(this.res);
    } catch (error) {
      return this.fail(error);
    } */
  }
}
