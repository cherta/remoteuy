import db, { User } from "db"
import { SessionContext } from "blitz"
import { VerificationInput, VerificationInputType } from "app/auth/validations"
import { Result } from "app/types"

export default async function verify(
  input: VerificationInputType,
  ctx: { session?: SessionContext } = {}
): Promise<Result<User>> {
  const { verificationCode } = VerificationInput.parse(input)
  let user = await db.user.findOne({ where: { verificationCode } })
  if (user === null) return { result: "error", message: "We couldn't find you in our records" }

  user = await db.user.update({ where: { verificationCode }, data: { verified: true } })
  await ctx.session!.create({ userId: user.id, roles: [user.role], verified: true })

  return { result: "success", data: user }
}
