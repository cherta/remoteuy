import { SessionContext, AuthorizationError } from "blitz"
import db, { CompanyUpdateArgs } from "db"
import getCompany from "app/companies/queries/getCompany"
import { UpdateCompanyInput } from "../validations"

type UpdateCompanyType = {
  data: CompanyUpdateArgs["data"]
  where: CompanyUpdateArgs["where"]
  // select?: CompanyUpdateArgs["select"]
  // include? CompanyUpdateArgs["include"]
}

export default async function updateCompany(
  { data, where }: UpdateCompanyType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const fields = UpdateCompanyInput.parse(data)

  const company = await getCompany({ where: { id: where.id } }, ctx)
  if (company?.userId !== ctx.session!.userId)
    throw new AuthorizationError("No podés actualizar esta empresa")

  return await db.company.update({ data: fields, where: where })
}
