import { SessionContext } from "blitz"
import db, { FindManyClaimArgs } from "db"

type GetClaimsInput = {
  where?: FindManyClaimArgs["where"]
}

export default async function getClaims(
  { where }: GetClaimsInput,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()
  const userFilter = ctx.session!.roles.includes("admin")
    ? {}
    : { userId: { equals: ctx.session!.userId } }
  const claims = await db.claim.findMany({
    where: {
      ...userFilter,
      ...where,
    },
    include: {
      company: true,
      user: true,
    },
  })

  return claims
}
