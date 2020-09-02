import { SessionContext } from "blitz"
import db, { CompanyCreateArgs } from "db"

type CreateCompanyInput = {
  data: CompanyCreateArgs["data"]
}
export default async function createCompany(
  { data }: CreateCompanyInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const company = await db.company.create({ data })

  return company
}
