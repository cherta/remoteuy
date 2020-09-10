import React, { PropsWithoutRef } from "react"
import { useField } from "react-final-form"

type Option = [number, string]

export interface LabeledDropDownProps extends PropsWithoutRef<JSX.IntrinsicElements["select"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  options: Option[]
  selectedOption?: number
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

export const LabeledDropDown = React.forwardRef<HTMLSelectElement, LabeledDropDownProps>(
  ({ name, label, outerProps, options, selectedOption, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name)
    return (
      <div className="mb-4" {...outerProps}>
        <label>
          {label && <div>{label}</div>}
          <select
            {...input}
            disabled={submitting}
            className={`border border-gray-300 p-2 border border-radius-0 outline-none ${
              touched && error && "border border-red-500"
            }`}
            {...props}
            ref={ref}
          >
            {options
              .concat([[-1, "Seleccione una opcion"]])
              .sort((a, b) => a[0] - b[0])
              .map((option) => {
                return (
                  <option key={option[0]} value={option[0]} defaultValue={selectedOption}>
                    {option[1]}
                  </option>
                )
              })}
          </select>
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

export default LabeledDropDown
