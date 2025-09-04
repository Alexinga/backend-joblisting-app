export class PasswordResetEntity {
  constructor(
    public id: number,
    public userId: number,
    public token: string,
    public expiredAt: Date,
    public updatedAt: Date
  ) {}
}
