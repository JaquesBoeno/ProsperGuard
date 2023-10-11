import React, { Dispatch, Ref, SetStateAction, useState } from 'react'
import './styles.scss'

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string
  prefix?: string
  inputType?: 'number' | 'text'
  setOutputValue?: Dispatch<SetStateAction<any>>
  reference?: Ref<any>
}

const StandardInput: React.FC<Props> = ({
  label,
  prefix,
  children,
  inputType,
  setOutputValue,
  reference,
  ...rest
}) => {
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let str = e.target.value
    if (inputType == 'number') str = str.replace(/\D/g, '')
    setValue(str)
    if (setOutputValue) setOutputValue(Number(str))
  }

  return (
    <div className="InputComponent">
      <input
        ref={reference}
        value={value}
        onChange={handleChange}
        {...rest}
        required
      >
        {children}
      </input>
      <span>{label}</span>
      {prefix && <span className="prefix"> {prefix}</span>}
    </div>
  )
}

export { StandardInput }
