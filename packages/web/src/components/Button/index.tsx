import React, { ReactNode } from 'react'

import './styles.scss'
interface Props extends React.HTMLProps<HTMLButtonElement> {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
  color?: 'primary' | 'green' | 'red'
}

const Button: React.FC<Props> = ({ onClick, type, color, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`ButtonComponent ${color}`}
    >
      {children}
    </button>
  )
}

export { Button }
