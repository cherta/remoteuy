import { SessionContext } from "blitz"
import db, { CompanyUpdateArgs } from "db"

type UpdateCompanyInput = {
  where: CompanyUpdateArgs["where"]
  data: CompanyUpdateArgs["data"]
}

export default async function updateCompany(
  { where, data }: UpdateCompanyInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const company = await db.company.update({ where, data })

  return company
}
