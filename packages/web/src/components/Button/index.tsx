import React from 'react'

import './styles.scss'
interface Props extends React.HTMLProps<HTMLButtonElement> {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
  color?: 'primary' | 'green' | 'red'
  title: string
}

const Button: React.FC<Props> = ({ onClick, type, color, title }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`ButtonComponent ${color}`}
    >
      {title}
    </button>
  )
}

export { Button }
