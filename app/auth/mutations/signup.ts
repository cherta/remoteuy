import db, { User } from "db"
import { SessionContext } from "blitz"
import { v4 as uuidv4 } from "uuid"
import { hashPassword } from "app/auth/auth-utils"
import { SignupInput, SignupInputType } from "app/auth/validations"
import { send as sendMail } from "app/mail"

const getAppUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  } else {
    return `http://localhost:3000`
  }
}

const mailVerificationCode = async (user: User) => {
  const data = {
    name: user.name || user.email,
    verificationCode: user.verificationCode,
    websiteUrl: `${getAppUrl()}/verify/`,
  }
  return await sendMail(user.email, data, "d-702b74048da24b12853ef70fdc2e7ba3")
}

export default async function signup(
  input: SignupInputType,
  ctx: { session?: SessionContext } = {}
) {
  // This throws an error if input is invalid
  const { email, password, name } = SignupInput.parse(input)

  const hashedPassword = await hashPassword(password)
  const user = await db.user.create({
    data: { email, hashedPassword, role: "user", verificationCode: uuidv4(), name: name },
    select: { id: true, name: true, email: true, role: true, verificationCode: true },
  })

  await mailVerificationCode(user as User)
  await ctx.session!.create({ userId: user.id, roles: [user.role], verified: false })

  return user
}
