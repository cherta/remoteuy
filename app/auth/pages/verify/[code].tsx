import React, { useEffect, useState } from "react"
import { useRouter, BlitzPage, useParam } from "blitz"
import verify from "app/auth/mutations/verify"
import Layout from "app/layouts/Layout"

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

  return <p>{message}</p>
}

VerifyPage.getLayout = (page) => (
  <Layout title="Empresas uruguayas que promueven el trabajo remoto | Verificando...">
    {page}
  </Layout>
)

export default VerifyPage
