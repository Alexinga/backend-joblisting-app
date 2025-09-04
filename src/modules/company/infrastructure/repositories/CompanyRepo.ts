import prisma from "../../../../prisma";
import { CompanyEntity } from "../../domain/entities/companyEntity";
import { AddCompanyDomainModel } from "../../domain/models/addCompany.model";
import { DeleteCompanyDomainModel } from "../../domain/models/deleteCompany.model";
import { UpdateCompanyDomainModel } from "../../domain/models/updateCompany.model";
import { ICompanyRepository } from "../../domain/repositories/ICompanyRepo";

export class CompanyRepository implements ICompanyRepository {
  async getCompanyDataInterface() {
    const companyDb = await prisma.company.findMany();
    const data = companyDb.map((company) => {
      return new CompanyEntity(
        company.id,
        company.name,
        company.companyImage,
        company.gallery,
        company.createdAt
      );
    });
    return data;
  }

  async addCompanyDataInterface(params: AddCompanyDomainModel) {
    const { name, companyImage, gallery } = params;

    const companyDb = await prisma.company.create({
      data: {
        name: name,
        companyImage: companyImage,
        gallery: gallery,
      },
    });
    return new CompanyEntity(
      companyDb.id,
      companyDb.name,
      companyDb.companyImage,
      companyDb.gallery,
      companyDb.createdAt
    );
  }

  async updateCompanyDataInterface(params: UpdateCompanyDomainModel) {
    const { id, ...updateFields } = params;
    const companyDb = await prisma.company.update({
      where: {
        id: id,
      },
      data: {
        name: updateFields.data.name,
        companyImage: updateFields.data.companyImage,
        gallery: updateFields.data.gallery,
      },
    });

    return new CompanyEntity(
      companyDb.id,
      companyDb.name,
      companyDb.companyImage,
      companyDb.gallery,
      companyDb.createdAt
    );
  }

  async deleteCompanyDataInterface(params: DeleteCompanyDomainModel) {
    const { id } = params;
    const companyDb = await prisma.company.delete({
      where: {
        id: id,
      },
    });
    return new CompanyEntity(
      companyDb.id,
      companyDb.name,
      companyDb.companyImage,
      companyDb.gallery,
      companyDb.createdAt
    );
  }
}
