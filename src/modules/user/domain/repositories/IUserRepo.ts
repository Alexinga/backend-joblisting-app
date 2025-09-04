import { DeleteCompanyDomainModel } from "../../../company/domain/models/deleteCompany.model";
import { UserEntity } from "../entities/userEntity";
import {
  CreateUserDomainModel,
  UpdateUserDomainModel,
} from "../models/createUser.model";

export interface IUserRepo {
  createUserInterface(params: CreateUserDomainModel): Promise<UserEntity>;
  readUserInterface(): Promise<UserEntity[]>;
  updateUserInterface(params: UpdateUserDomainModel): Promise<UserEntity>;
  deleteUserInterface(params: DeleteCompanyDomainModel): Promise<UserEntity>;
  findUserByEmailInterface(email: string): Promise<UserEntity | null>;
  findUserByIdInterface(id: number): Promise<UserEntity | null>;
}
