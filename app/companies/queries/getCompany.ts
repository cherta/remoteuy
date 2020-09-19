import { AuthorizationError, SessionContext } from "blitz"
import db, { FindOneCompanyArgs } from "db"

type GetCompanyInput = {
  where: FindOneCompanyArgs["where"]
  // select?: FindOneCompanyArgs["select"]
  // include?: FindOneCompanyArgs["include"]
}

export default async function getCompany(
  { where }: GetCompanyInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const company = await db.company.findOne({
    where,
  })

  if (ctx.session!.userId !== company?.userId)
    throw new AuthorizationError("No podés actualizar esta empresa")

  return company
}
