import React from "react"
import { useRouter, BlitzPage } from "blitz"
import { Form, FORM_ERROR } from "app/components/Form"
import { LabeledTextField } from "app/components/LabeledTextField"
import signup from "app/auth/mutations/signup"
import { SignupInput, SignupInputType } from "app/auth/validations"
import Layout from "app/layouts/Layout"
import { Title } from "app/components/Typography"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <>
      <div>
        <Title>Crear una cuenta</Title>

        <Form<SignupInputType>
          submitText="Registrarse"
          schema={SignupInput}
          onSubmit={async (values) => {
            try {
              await signup({ email: values.email, password: values.password, name: values.name })
              router.push("/")
            } catch (error) {
              if (error.code === "P2002" && error.meta?.target?.includes("email")) {
                // This error comes from Prisma
                return { email: "This email is already being used" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <LabeledTextField name="name" label="Nombre" placeholder="John Doe" />
          <LabeledTextField name="email" label="Email" placeholder="john@doe.com" />
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
        </Form>
      </div>
    </>
  )
}

SignupPage.getLayout = (page) => (
  <Layout title="Empresas uruguayas que promueven el trabajo remoto | Crear cuenta">{page}</Layout>
)

export default SignupPage
