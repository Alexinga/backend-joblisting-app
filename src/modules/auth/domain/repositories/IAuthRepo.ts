import { AuthEntity } from "../entities/authEntity";

export interface IAuthRepo {
  hashPasswordInterface(password: string): Promise<AuthEntity>;

  comparePasswordInterface(params: {
    password: string;
    hash: string;
  }): Promise<boolean>;

  cryptoPasswordInterface(): Promise<{
    hashedCryptoToken: string;
    expire: Date;
  }>;
}
