import React from "react"
import { useRouter, BlitzPage } from "blitz"
import { LoginForm } from "app/auth/components/LoginForm"
import Layout from "app/layouts/Layout"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return <LoginForm onSuccess={() => router.push("/")} />
}

LoginPage.getLayout = (page) => (
  <Layout title="Empresas uruguayas que promueven el trabajo remoto | Ingresar">{page}</Layout>
)

export default LoginPage
