export class CompanyEntity {
  constructor(
    public id: number,
    public name: string,
    public companyImage: string | null,
    public gallery: string[],
    public createdAt: Date
  ) {}
}
