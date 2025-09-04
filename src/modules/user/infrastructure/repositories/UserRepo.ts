import { Prisma } from "../../../../generated/prisma";
import prisma from "../../../../prisma";
import { DeleteCompanyDomainModel } from "../../../company/domain/models/deleteCompany.model";
import { UserEntity } from "../../domain/entities/userEntity";
import {
  CreateUserDomainModel,
  UpdateUserDomainModel,
} from "../../domain/models/createUser.model";
import { IUserRepo } from "../../domain/repositories/IUserRepo";

export class UserRepository implements IUserRepo {
  async readUserInterface() {
    const userDb = await prisma.user.findMany();
    const data = userDb.map((user) => {
      return new UserEntity(
        user.id,
        user.createdAt,
        user.name,
        user.email,
        user.password,
        user.authProvider,
        user.role
      );
    });
    return data;
  }

  async createUserInterface(params: CreateUserDomainModel) {
    const { name, email, role } = params;
    const userDb = await prisma.user.create({
      data: {
        name: name,
        email: email,
        role: role ?? "USER",
      },
    });

    return new UserEntity(
      userDb.id,
      userDb.createdAt,
      userDb.name,
      userDb.email,
      userDb.password,
      userDb.authProvider,
      userDb.role
    );
  }

  // The UpdateUserDomainModel is flat like {id, name, email, role}
  // if you want you can change it not flat like {id, data: {name, email, role}}
  async updateUserInterface(
    params: UpdateUserDomainModel
  ): Promise<UserEntity> {
    const { id, ...updateFields } = params;
    const userDb = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: updateFields.name,
        email: updateFields.email,
        role: updateFields.role,
      },
    });
    console.log("params:", params);
    return new UserEntity(
      userDb.id,
      userDb.createdAt,
      userDb.name,
      userDb.email,
      userDb.password,
      userDb.authProvider,
      userDb.role
    );
  }

  async deleteUserInterface(params: DeleteCompanyDomainModel) {
    const { id } = params;
    const userDb = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return new UserEntity(
      userDb.id,
      userDb.createdAt,
      userDb.name,
      userDb.email,
      userDb.password,
      userDb.authProvider,
      userDb.role
    );
  }

  async findUserByEmailInterface(email: string): Promise<UserEntity | null> {
    if (!email) {
      return null;
    }

    const userDb = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userDb) return null;

    return new UserEntity(
      userDb.id,
      userDb.createdAt,
      userDb.name,
      userDb.email,
      userDb.password,
      userDb.authProvider,
      userDb.role
    );
  }

  async findUserByIdInterface(id: number): Promise<UserEntity | null> {
    if (!id) return null;
    const userDb = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!userDb) return null;

    return new UserEntity(
      userDb.id,
      userDb.createdAt,
      userDb.name,
      userDb.email,
      userDb.password,
      userDb.authProvider,
      userDb.role
    );
  }
}
