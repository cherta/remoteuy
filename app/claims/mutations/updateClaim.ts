import db, { Company, User, ClaimStatus } from "db"
import { SessionContext } from "blitz"
import { UpdateClaimInputType, UpdateClaimInput } from "app/claims/validations"
import { send as sendMail } from "app/mail"

const getAppUrl = () => {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  } else {
    return `http://localhost:3000`
  }
}

const mailClaimUpdate = async (user: User, company: Company) => {
  const data = {
    name: user.name || user.email,
    companyName: company.name,
    websiteUrl: `${getAppUrl()}/`,
    companyPath: `admin/companies/${company.id}`,
  }
  return await sendMail(user.email, data, "d-d02ddd39e134449eb4c38f539ca69509")
}

export default async function updateClaim(
  input: UpdateClaimInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize("admin")

  const { status, id } = UpdateClaimInput.parse(input)
  const claim = await db.claim.update({
    data: {
      status,
    },
    where: {
      id,
    },
    include: { user: true, company: true },
  })
  if (status === ClaimStatus.APPROVED) {
    if (claim.user && claim.company) {
      await mailClaimUpdate(claim.user, claim.company)
    }
    await db.company.update({
      where: { id: claim.companyId || undefined },
      data: { user: { connect: { id: ctx.session?.userId } } },
    })
  }

  return claim
}
