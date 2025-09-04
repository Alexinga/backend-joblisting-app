import { ICompanyRepository } from "../../domain/repositories/ICompanyRepo";

import { AddCompanyDTO } from "../DTO/AddCompanyDTO";
import { DeleteCompanyDTO } from "../DTO/DeleteCompanyDTO";
import { UpdateCompanyDTO } from "../DTO/UpdateCompanyDTO";

export class CompanyService {
  constructor(private companyRepo: ICompanyRepository) {}
  async getCompanyData() {
    return this.companyRepo.getCompanyDataInterface();
  }

  async addCompanyData(params: AddCompanyDTO) {
    return this.companyRepo.addCompanyDataInterface(params);
  }

  async updateCompanyData(params: UpdateCompanyDTO) {
    return this.companyRepo.updateCompanyDataInterface(params);
  }

  async deleteCompanyData(params: DeleteCompanyDTO) {
    return this.companyRepo.deleteCompanyDataInterface(params);
  }
}
