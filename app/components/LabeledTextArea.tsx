import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"

export interface LabeledTextAreaProps extends PropsWithoutRef<JSX.IntrinsicElements["textarea"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledTextArea = React.forwardRef<HTMLTextAreaElement, LabeledTextAreaProps>(
  ({ name, label, outerProps, className = "", ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting, pristine },
    } = useField(name)
    return (
      <div className="mb-4" {...outerProps}>
        <label>
          {label && <div>{label}</div>}
          <textarea
            {...input}
            disabled={submitting}
            className={`border border-gray-300 p-2 border border-radius-0 outline-none ${
              touched && (error || submitError) && !submitting && "border border-red-500"
            } ${className}`}
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

export default LabeledTextArea
