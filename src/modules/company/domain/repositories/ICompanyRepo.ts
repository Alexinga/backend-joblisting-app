import { CompanyEntity } from "../entities/companyEntity";
import { AddCompanyDomainModel } from "../models/addCompany.model";
import { DeleteCompanyDomainModel } from "../models/deleteCompany.model";
import { UpdateCompanyDomainModel } from "../models/updateCompany.model";

export interface ICompanyRepository {
  getCompanyDataInterface(): Promise<CompanyEntity[]>;

  addCompanyDataInterface(
    params: AddCompanyDomainModel
  ): Promise<CompanyEntity>;

  updateCompanyDataInterface(
    params: UpdateCompanyDomainModel
  ): Promise<CompanyEntity>;

  deleteCompanyDataInterface(
    params: DeleteCompanyDomainModel
  ): Promise<CompanyEntity>;
}
