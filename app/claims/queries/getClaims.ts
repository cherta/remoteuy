import { SessionContext } from "blitz"
import db from "db"

export default async function getClaims(_, ctx: { session?: SessionContext } = {}) {
  ctx.session!.isAuthorized()

  const companies = await db.claim.findMany({
    where: {
      userId: { equals: ctx.session?.userId },
    },
    include: {
      company: true,
    },
  })

  return companies
}
