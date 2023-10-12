import React, { ReactNode } from 'react'

import './styles.scss'
interface Props {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
}

const Button: React.FC<Props> = ({ children, onClick, type }) => {
  return (
    <button type={type} onClick={onClick} className="ButtonComponent">
      {children}
    </button>
  )
}

export { Button }
