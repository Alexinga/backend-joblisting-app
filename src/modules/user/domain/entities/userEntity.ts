export class UserEntity {
  constructor(
    public id: number,
    public createdAt: Date,
    public name: string,
    public email: string,
    public password: string | null,
    public authProvider: "CREDENTIALS" | "GOOGLE",
    public role: "USER" | "ADMIN" | "MANAGER"
  ) {}
}
