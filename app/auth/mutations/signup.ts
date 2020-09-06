import db from "db"
import { SessionContext } from "blitz"
import { v4 as uuidv4 } from "uuid"
import { hashPassword } from "app/auth/auth-utils"
import { SignupInput, SignupInputType } from "app/auth/validations"
import client from "@sendgrid/client"

client.setApiKey(process.env.SENDGRID_API_KEY as string)

const getAppUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  } else {
    return `http://localhost:3000`
  }
}

const mailVerificationCode = async (user) => {
  await client.request({
    url: "/v3/mail/send",
    method: "POST",
    body: {
      from: {
        email: "cherta@remote..uy",
      },
      personalizations: [
        {
          to: [
            {
              email: user.email,
            },
          ],
          dynamic_template_data: {
            name: user.name || user.email,
            verificationCode: user.verificationCode,
            websiteUrl: `${getAppUrl()}/verify/`,
          },
        },
      ],
      template_id: "d-702b74048da24b12853ef70fdc2e7ba3",
    },
  })
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

  await mailVerificationCode(user)
  await ctx.session!.create({ userId: user.id, roles: [user.role], verified: false })

  return user
}
