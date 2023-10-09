import React, { Dispatch, SetStateAction, useState } from 'react'

import './styles.scss'
import { StandardInput } from '.'

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string
  setOutputValue?: Dispatch<SetStateAction<number | undefined>>
}

const CurrencyInput: React.FC<Props> = ({ label, setOutputValue, ...rest }) => {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let str = e.target.value
    let [integer, decimal] = str
      .replace(/\D/g, '')
      .padStart(4, '0')
      .split(/(?=..$)/)

    integer = Number(integer).toLocaleString('pt-br')

    str = [integer, decimal].join(',').replace(/^0+/, '').padStart(4, '0')

    if (str == '0.00') str = ''

    setValue(str)

    if (setOutputValue)
      setOutputValue(
        Number(
          str
            .replace(/[,.]/g, '')
            .split(/(?=..$)/)
            .join('.')
        )
      )
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
