import db from "db"
import { SessionContext } from "blitz"

export default async function getCurrentUser(_ = null, ctx: { session?: SessionContext } = {}) {
  if (!ctx.session?.userId) return undefined

  const user = await db.user.findOne({
    where: { id: ctx.session!.userId },
    select: { id: true, name: true, email: true, role: true, verified: true },
  })

  return user === null ? undefined : user
}
