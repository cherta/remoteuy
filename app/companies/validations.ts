import * as z from "zod"

export const UpdateCompanyInput = z.object({
  name: z.string(),
  description: z.string(),
  hasOffices: z.boolean(),
  allowsFullRemote: z.boolean(),
})
export type UpdateCompanyInputType = z.infer<typeof UpdateCompanyInput>
