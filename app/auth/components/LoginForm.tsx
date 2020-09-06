import React from "react"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import login from "app/auth/mutations/login"
import { LoginInput, LoginInputType } from "app/auth/validations"
import { Title } from "app/components/Typography"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  return (
    <div>
      <Title>Login</Title>

      <Form<LoginInputType>
        submitText="Log In"
        schema={LoginInput}
        initialValues={{ email: undefined, password: undefined }}
        onSubmit={async (values) => {
          try {
            await login({ email: values.email, password: values.password })
            props.onSuccess && props.onSuccess()
          } catch (error) {
            if (error.name === "AuthenticationError") {
              return { [FORM_ERROR]: "Las credenciales son inválidas" }
            } else {
              return {
                [FORM_ERROR]:
                  "Encontramos un error inesperado. Por favor vuelva a intentarlo. - " +
                  error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="john@doe.com" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}

export default LoginForm
