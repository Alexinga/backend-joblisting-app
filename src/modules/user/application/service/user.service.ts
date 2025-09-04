import { IUserRepo } from "../../domain/repositories/IUserRepo";

export class UserService {
  constructor(private userRepo: IUserRepo) {}
  async readUser() {
    return this.userRepo.readUserInterface();
  }

  async createUser(params: {
    name: string;
    email: string;
    password: string | null;
    role: "USER" | "ADMIN" | "MANAGER";
  }) {
    return this.userRepo.createUserInterface(params);
  }

  async updateUser(params: {
    id: number;
    data: {
      name?: string;
      email?: string;
      role?: "USER" | "ADMIN" | "MANAGER";
    };
  }) {
    // need to flatten the object where it is resembles {id, name, email, role}
    return this.userRepo.updateUserInterface({ id: params.id, ...params.data });
  }

  async deleteUser(params: { id: number }) {
    return this.userRepo.deleteUserInterface(params);
  }

  async findUserByEmail(email: string) {
    return this.userRepo.findUserByEmailInterface(email);
  }

  async findUserById(id: number) {
    return this.userRepo.findUserByIdInterface(id);
  }
}
