import React, { forwardRef } from 'react'
import './styles.scss'

interface StandardInputProps extends React.HTMLProps<HTMLInputElement> {
  label: string
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

export { StandardInput }
