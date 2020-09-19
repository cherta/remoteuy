import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledCheckboxProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledCheckbox = React.forwardRef<HTMLInputElement, LabeledCheckboxProps>(
  ({ name, label, outerProps, value, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, { type: "checkbox" })

    return (
      <div className="mb-4" {...outerProps}>
        <label>
          {label && <div>{label}</div>}
          <input
            {...input}
            type="checkbox"
            disabled={submitting}
            className={`border border-gray-300 p-2 border border-radius-0 outline-none ${
              touched && error && "border border-red-500"
            }`}
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

export default LabeledCheckbox
