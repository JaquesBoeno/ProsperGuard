import React, { forwardRef } from 'react'
import './styles.scss'
import { CurrencyInput } from './CurrencyInput'
import { DateInput } from './DateInput'
import { PercentInput } from './PercentInput'
import { NumberInput } from './NumberInput'

interface StandardInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
}
interface InputProps {
  label: string
  type: 'text' | 'number' | 'currency' | 'date' | 'percent'
}

const StandardInput = forwardRef<HTMLInputElement, StandardInputProps>(
  ({ label, children, ...rest }, ref) => {
    return (
      <div className="InputComponent">
        <input ref={ref} {...rest} required />
        <span>{label}</span>
      </div>
    )
  }
)

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, ...rest }, ref) => {
    const inputsReturn = {
      text: <StandardInput label={label} ref={ref} {...rest} />,
      number: <NumberInput label={label} ref={ref} {...rest} />,
      currency: <CurrencyInput label={label} ref={ref} {...rest} />,
      date: <DateInput label={label} ref={ref} {...rest} />,
      percent: <PercentInput label={label} ref={ref} {...rest} />,
    }

    return inputsReturn[type]
  }
)

export { StandardInput, Input }
