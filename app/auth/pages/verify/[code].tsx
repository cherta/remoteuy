import React, { useEffect, useState } from "react"
import { Head, useRouter, BlitzPage, useParam } from "blitz"
import verify from "app/auth/mutations/verify"

const VerifyPage: BlitzPage = () => {
  const router = useRouter()
  const verificationCode = useParam("code", "string")
  const [message, setMessage] = useState("Checking your verification link...")
  useEffect(() => {
    async function verifyUser() {
      const response = await verify({ verificationCode })
      switch (response.result) {
        case "error":
          setMessage(response.message)
          break
        case "success":
          router.push("/")
          break
      }
    }
    if (verificationCode && verificationCode !== "") verifyUser()
  }, [router, verificationCode])

  return (
    <>
      <Head>
        <title>Account Verification</title>
      </Head>

      <p>{message}</p>
    </>
  )
}

export default VerifyPage
