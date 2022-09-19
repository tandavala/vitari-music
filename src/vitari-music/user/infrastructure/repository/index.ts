//import models from "../../../../infrastructure/sequelize/models";
import { UserRepository } from "./user.repository";

const userRepository = new UserRepository();

export { userRepository };
