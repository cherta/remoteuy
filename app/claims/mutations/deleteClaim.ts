import db, { ClaimStatus } from "db"
import { SessionContext } from "blitz"
import { DeleteClaimInputType, DeleteClaimInput } from "app/claims/validations"
import { Result } from "app/types"

export default async function deleteClaim(
  input: DeleteClaimInputType,
  ctx: { session?: SessionContext } = {}
): Promise<Result<Boolean>> {
  ctx.session!.isAuthorized()
  const { claimId } = DeleteClaimInput.parse(input)
  const claim = await db.claim.findOne({ where: { id: claimId } })
  if (!claim || claim.userId !== ctx.session?.userId)
    return { result: "error", message: `The requested company was not found` }

  await db.claim.delete({ where: { id: claimId } })
  return { result: "success", data: true }
}
