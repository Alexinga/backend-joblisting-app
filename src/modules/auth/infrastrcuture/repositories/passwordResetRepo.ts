import prisma from "../../../../prisma";
import { PasswordResetEntity } from "../../domain/entities/passwordResetEntity";
import { IPasswordResetRepo } from "../../domain/repositories/IPasswordResetRepo";

export class PasswordResetRepository implements IPasswordResetRepo {
  async createPasswordResetInterface(params: {
    userId: number;
    token: string;
    expiresAt: Date;
  }): Promise<PasswordResetEntity> {
    // since i am doing using the params as the same for data
    const passwordDb = await prisma.passwordReset.create({
      data: params,
    });

    return new PasswordResetEntity(
      passwordDb.id,
      passwordDb.userId,
      passwordDb.token,
      passwordDb.expiresAt,
      passwordDb.updatedAt
    );
  }
}
