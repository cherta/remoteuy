import { SessionContext } from "blitz"
import db, { CompanyDeleteArgs } from "db"

type DeleteCompanyInput = {
  where: CompanyDeleteArgs["where"]
}

export default async function deleteCompany(
  { where }: DeleteCompanyInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const company = await db.company.delete({ where })

  return company
}
