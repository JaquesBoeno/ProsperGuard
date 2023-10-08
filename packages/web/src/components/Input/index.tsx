import React from 'react'
import './styles.scss'

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string
  prefix?: string
}

const StandardInput: React.FC<Props> = ({
  label,
  prefix,
  children,
  ...rest
}) => {
  return (
    <div className="InputComponent">
      <input {...rest} required>
        {children}
      </input>
      <span>{label}</span>
      {prefix && <span className="prefix"> {prefix}</span>}
    </div>
  )
}

export { StandardInput }
