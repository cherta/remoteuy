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

  const claims = await db.claim.findMany({
    where: {
      userId: { equals: ctx.session?.userId },
      ...where,
    },
    include: {
      company: true,
    },
  })

  return claims
}
