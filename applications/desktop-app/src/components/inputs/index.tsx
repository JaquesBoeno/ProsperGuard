import React, { forwardRef } from 'react'

import './styles.scss'
import { DateInput } from '~/components/inputs/DateInput'
import { PercentInput } from '~/components/inputs/PercentInput'
import { CurrencyInput } from '~/components/inputs/CurrencyInput'
import { NumberInput } from '~/components/inputs/NumberInput'

interface InputProps {
  label: string
  errors?: string
  type: 'text' | 'number' | 'currency' | 'date' | 'percent'
}

interface StandardInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  errors?: string
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

export { Input, StandardInput }
