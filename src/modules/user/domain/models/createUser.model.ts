export type CreateUserDomainModel = {
  name: string;
  email: string;
  password: string | null;
  role: "USER" | "ADMIN" | "MANAGER";
};

export type UpdateUserDomainModel = {
  id: number;
  name?: string;
  email?: string;
  role?: "USER" | "ADMIN" | "MANAGER";
};

export type DeleteUserDomainModel = {
  id: number;
};
