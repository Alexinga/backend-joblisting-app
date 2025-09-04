import bcrypt from "bcrypt";
import crypto from "crypto";
import { AuthEntity } from "../../domain/entities/authEntity";
import { IAuthRepo } from "../../domain/repositories/IAuthRepo";

export class AuthRepository implements IAuthRepo {
  async hashPasswordInterface(passwordParam: string) {
    const password = await bcrypt.hash(passwordParam, 10);
    return new AuthEntity(password);
  }

  async comparePasswordInterface(params: { password: string; hash: string }) {
    const checkPassword = await bcrypt.compare(params.password, params.hash);
    return checkPassword;
  }

  async cryptoPasswordInterface(): Promise<{
    hashedCryptoToken: string;
    expire: Date;
  }> {
    const cryptoToken = crypto.randomBytes(32).toString("hex");
    const hashedCryptoToken = crypto
      .createHash("sha256")
      .update(cryptoToken)
      .digest("hex");
    const expire = new Date(Date.now() + 100 * 60 * 15);
    const data = { hashedCryptoToken, expire };
    return data;
  }
}
