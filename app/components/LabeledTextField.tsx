import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextField = React.forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name)

    return (
      <div className="mb-4" {...outerProps}>
        <label>
          {label && <div>{label}</div>}
          <input
            {...input}
            disabled={submitting}
            className={`border border-gray-300 p-2 border border-radius-0 outline-none ${
              touched && error && "border border-red-500"
            }`}
            autoComplete="off"
            {...props}
            ref={ref}
          />
        </label>

        {touched && (error || submitError) && (
          <div role="alert" className="text-sm text-red-500">
            {error || submitError}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextField
