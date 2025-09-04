import { PasswordResetEntity } from "../entities/passwordResetEntity";

export interface IPasswordResetRepo {
  createPasswordResetInterface(params: {
    userId: number;
    token: string;
    expiresAt: Date;
  }): Promise<PasswordResetEntity>;
}
