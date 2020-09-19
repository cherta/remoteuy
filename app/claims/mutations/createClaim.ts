import db, { ClaimStatus, Company, User } from "db"
import { SessionContext } from "blitz"
import { CreateClaimInputType, CreateClaimInput } from "app/claims/validations"
import { send as sendMail } from "app/mail"

const mailClaimCreation = async (user: User, company: Company) => {
  const data = {
    name: user.name || user.email,
    companyName: company.name,
  }
  return await sendMail(user.email, data, "d-a8326743e6c0483c9f72b15f4a4d1941")
}

export default async function createClaim(
  input: CreateClaimInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const { companyId, info } = CreateClaimInput.parse(input)
  const claim = await db.claim.create({
    data: {
      info,
      status: ClaimStatus.CREATED,
      company: { connect: { id: parseInt(companyId, 10) } },
      user: { connect: { id: ctx.session!.userId } },
    },
    include: { user: true, company: true },
  })
  if (claim.user && claim.company) await mailClaimCreation(claim.user, claim.company)
  return claim
}
