import * as z from "zod"

export const SignupInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(10).max(100),
})
export type SignupInputType = z.infer<typeof SignupInput>

export const LoginInput = z.object({
  email: z.string().email(),
  password: z.string(),
})
export type LoginInputType = z.infer<typeof LoginInput>

export const VerificationInput = z.object({
  verificationCode: z.string().optional(),
})
export type VerificationInputType = z.infer<typeof VerificationInput>
