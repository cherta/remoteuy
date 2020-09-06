import React, { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import * as z from "zod"
export { FORM_ERROR } from "final-form"

type FormProps<FormValues> = {
  /** All your form fields */
  children: ReactNode
  /** Text to display in the submit button */
  submitText: string
  onSubmit: FinalFormProps<FormValues>["onSubmit"]
  initialValues?: FinalFormProps<FormValues>["initialValues"]
  schema?: z.ZodType<any, any>
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">

export function Form<FormValues extends Record<string, unknown>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<FormValues>) {
  return (
    <FinalForm<FormValues>
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} {...props}>
          {submitError && (
            <div role="alert" className="text-white bg-red-500 p-2 mb-4">
              {submitError}
            </div>
          )}

          {/* Form fields supplied as children are rendered here */}
          {children}

          <button
            type="submit"
            className="border-0 bg-gray-300 hover:bg-gray-500 focus:outline-none p-2"
            disabled={submitting}
          >
            {submitText}
          </button>
        </form>
      )}
    />
  )
}

export default Form
