import React, { ReactNode } from 'react'

import './styles.scss'
interface Props {
  children: ReactNode
  onClick?: () => void
}

const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="ButtonComponent">
      {children}
    </button>
  )
}

export { Button }
