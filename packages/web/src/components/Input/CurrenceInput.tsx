import React, { useState } from 'react'

import './styles.scss'
import { StandardInput } from '.'

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string
}

const CurrencyInput: React.FC<Props> = ({ label, ...rest }) => {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let str = e.target.value
    str = str
      .replace(/\D/g, '')
      .padStart(4, '0')
      .split(/(?=..$)/)
      .join('.')
      .replace(/^0+/, '')
      .padStart(4, '0')
    if (str == '0.00') str = ''
    setValue(str)
  }

  return (
    <StandardInput
      label={label}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
      className="CurrencyInput"
      prefix="R$"
      {...rest}
    />
  )
}

export { CurrencyInput }
