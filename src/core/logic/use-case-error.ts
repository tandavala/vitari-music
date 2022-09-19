interface IUserUseCaseError {
  message: string;
}

export abstract class UseCaseError implements IUserUseCaseError {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}
