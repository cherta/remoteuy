import db from "db"
import { SessionContext, AuthorizationError } from "blitz"
import { DeleteClaimInputType, DeleteClaimInput } from "app/claims/validations"

export default async function deleteClaim(
  input: DeleteClaimInputType,
  ctx: { session?: SessionContext } = {}
) {
  ctx.session!.authorize()

  const { claimId } = DeleteClaimInput.parse(input)
  const claim = await db.claim.findOne({ where: { id: claimId } })
  if (!claim || claim.userId !== ctx.session?.userId)
    throw new AuthorizationError("The requested company was not found")

  const deletedClaim = await db.claim.delete({ where: { id: claimId } })
  return deletedClaim
}
