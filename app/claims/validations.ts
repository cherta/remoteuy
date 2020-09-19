import * as z from "zod"

export const CreateClaimInput = z.object({
  companyId: z.string().refine(
    (companyId) => {
      return parseInt(companyId, 10) > 0
    },
    { message: "Seleccione una empresa" }
  ),
  info: z.string(),
})
export type CreateClaimInputType = z.infer<typeof CreateClaimInput>

export const DeleteClaimInput = z.object({
  claimId: z.number(),
})
export type DeleteClaimInputType = z.infer<typeof DeleteClaimInput>

export const UpdateClaimInput = z.object({
  id: z.number(),
  status: z.enum(["APPROVED", "CREATED", "REJECTED"]),
})
export type UpdateClaimInputType = z.infer<typeof UpdateClaimInput>
