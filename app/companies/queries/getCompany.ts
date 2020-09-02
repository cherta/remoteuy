import { NotFoundError, SessionContext } from "blitz"
import db, { FindOneCompanyArgs } from "db"

type GetCompanyInput = {
  where: FindOneCompanyArgs["where"]
  // Only available if a model relationship exists
  // include?: FindOneCompanyArgs['include']
}

export default async function getCompany(
  { where /* include */ }: GetCompanyInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const company = await db.company.findOne({ where })

  if (!company) throw new NotFoundError()

  return company
}
