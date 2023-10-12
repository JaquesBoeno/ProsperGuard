import React, { Ref } from 'react'
import './styles.scss'
import { CurrencyInput } from './CurrencyInput'
import { DateInput } from './DateInput'

interface StandardInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
  inputType?: 'number' | 'text'
  reference?: Ref<any>
}

interface InputProps {
  label: string
  inputType: 'Date' | 'Currency' | 'Text' | 'Number'
}

const StandardInput: React.FC<StandardInputProps> = ({
  label,
  children,
  inputType,
  reference,
  ...rest
}) => {
  return (
    <div className="InputComponent">
      <input ref={reference} {...rest} required>
        {children}
      </input>
      <span>{label}</span>
    </div>
  )
}
const Input: React.FC<InputProps> = ({ inputType, label, ...rest }) => {
  switch (inputType) {
    case 'Currency':
      return <CurrencyInput label={label} {...rest} />

    case 'Date':
      return <DateInput label={label} {...rest} />

    case 'Text':
      return <StandardInput label={label} {...rest} />

    default:
      return <StandardInput label={label} {...rest} />
  }
}

export { StandardInput, Input }
