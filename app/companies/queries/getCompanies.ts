import { SessionContext } from "blitz"
import db, { FindManyCompanyArgs } from "db"

type GetCompaniesInput = {
  where?: FindManyCompanyArgs["where"]
  orderBy?: FindManyCompanyArgs["orderBy"]
  cursor?: FindManyCompanyArgs["cursor"]
  take?: FindManyCompanyArgs["take"]
  skip?: FindManyCompanyArgs["skip"]
  // Only available if a model relationship exists
  // include?: FindManyCompanyArgs['include']
}

export default async function getCompanies(
  { where, orderBy = { createdAt: "asc" }, cursor, take, skip }: GetCompaniesInput,
  _ctx: { session?: SessionContext } = {}
) {
  const companies = await db.company.findMany({
    where,
    orderBy,
    cursor,
    take,
    skip,
  })

  return companies
}
