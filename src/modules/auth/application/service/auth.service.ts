import { IUserRepo } from "../../../user/domain/repositories/IUserRepo";
import { IAuthRepo } from "../../domain/repositories/IAuthRepo";
import { IPasswordResetRepo } from "../../domain/repositories/IPasswordResetRepo";

export class AuthService {
  constructor(
    private authRepo: IAuthRepo,
    private userRepo: IUserRepo,
    private passwordResetRepo: IPasswordResetRepo
  ) {}
  async registerUser(params: {
    name: string;
    email: string;
    password: string;
  }) {
    const hashedPassword = await this.authRepo.hashPasswordInterface(
      params.password
    );

    const newUser = await this.userRepo.createUserInterface({
      name: params.name,
      email: params.email,
      password: hashedPassword.password,
      role: "USER",
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }

  async loginUser(params: { email: string; password: string }) {
    const selectUser = await this.userRepo.findUserByEmailInterface(
      params.email
    );
    // Instead of writing null in the method of hash to string | null
    // we instead can write a guard to help with any null or undefined scenarios
    if (!selectUser || !selectUser.password) {
      throw new Error("invalid email or password");
    }

    if (selectUser.authProvider === "GOOGLE" && !selectUser.password) {
      throw new Error(
        "This account was created using Google. Please sign in with Google."
      );
    }
    const passwordCheck = await this.authRepo.comparePasswordInterface({
      password: params.password,
      hash: selectUser.password,
    });

    if (!passwordCheck) {
      throw new Error("Invalid password");
    }

    const { password: _, ...selectUserWithoutPassword } = selectUser;

    return selectUserWithoutPassword;
  }

  async getRefreshedUserData(id: number) {
    const selectUser = await this.userRepo.findUserByIdInterface(id);
    if (!selectUser) {
      throw new Error("No user found");
    }

    return selectUser;
  }

  async forgotPassword(email: string) {
    const user = await this.userRepo.findUserByEmailInterface(email);
    if (!user) {
      console.log(`No user found for email: ${email}`);
      return;
    }

    const cryptoData = await this.authRepo.cryptoPasswordInterface();

    const createPasswordData =
      await this.passwordResetRepo.createPasswordResetInterface({
        userId: user.id,
        token: cryptoData.hashedCryptoToken,
        expiresAt: cryptoData.expire,
      });

    return createPasswordData;
  }
}
