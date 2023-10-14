import React, { forwardRef } from 'react'
import './styles.scss'
import { CurrencyInput } from './CurrencyInput'
import { DateInput } from './DateInput'
import { PercentInput } from './PercentInput'
import { NumberInput } from './NumberInput'

interface StandardInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  errors?: string
}

interface InputProps {
  label: string
  errors?: string
  type: 'text' | 'number' | 'currency' | 'date' | 'percent'
}

const StandardInput = forwardRef<HTMLInputElement, StandardInputProps>(
  ({ label, errors, ...rest }, ref) => {
    return (
      <div className="InputComponent">
        <div>
          <input ref={ref} {...rest} required />
          <span>{label}</span>
        </div>
        <p className="error">{errors}</p>
      </div>
    )
  }
)

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, type, errors, ...rest }, ref) => {
  const inputsReturn = {
    text: <StandardInput label={label} ref={ref} errors={errors} {...rest} />,
    number: <NumberInput label={label} ref={ref} errors={errors} {...rest} />,
    currency: <CurrencyInput label={label} ref={ref} errors={errors} {...rest} />,
    date: <DateInput label={label} ref={ref} errors={errors} {...rest} />,
    percent: <PercentInput label={label} ref={ref} errors={errors} {...rest} />,
  }

  return inputsReturn[type]
})

export { StandardInput, Input }
