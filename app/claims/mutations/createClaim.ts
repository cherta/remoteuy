import db, { ClaimStatus } from "db"
import { SessionContext } from "blitz"
import { CreateClaimInputType, CreateClaimInput } from "app/claims/validations"

export default async function createClaim(
  input: CreateClaimInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.isAuthorized()

  const { companyId, info } = CreateClaimInput.parse(input)
  const claim = await db.claim.create({
    data: {
      info,
      status: ClaimStatus.CREATED,
      company: { connect: { id: parseInt(companyId, 10) } },
      user: { connect: { id: ctx.session!.userId } },
    },
  })
  return claim
}
