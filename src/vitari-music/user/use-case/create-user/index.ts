import { userRepository } from "../../infrastructure/repository";
import { CreateUserUseCase } from "./create-user.usecase";
import { CreateUserController } from "./user.controller";

const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

export { createUserUseCase, createUserController };
