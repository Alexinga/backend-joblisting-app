export class JobEntity {
  constructor(
    public id: number,
    public createdAt: Date,
    public title: string,
    public description: string,
    public salary: number,
    public jobType: string,
    public position: string,
    // public company: {
    //   name: string;
    //   companyImage: string | null;
    //   gallery: string[];
    // } | null,
    public companyId: number | null,
    public location: { city: string; state: string; country: string } | null,
    public locationId: number | null,
    public contact: { name: string; email: string; phoneNumber: string } | null
  ) {}

  // Example methods to see what an entity can hold
  public highPayingJob(threshold: number = 100000): boolean {
    return this.salary >= threshold;
  }

  public isJobInUSA(): boolean {
    return this.location?.country === "USA";
  }
}
