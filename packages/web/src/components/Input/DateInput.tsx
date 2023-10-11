import React from 'react'

import './styles.scss'
import { useIMask } from 'react-imask'
import { StandardInput } from '.'

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string
}

const DateInput: React.FC<Props> = ({ label, ...rest }) => {
  const pattern = 'd{/}`m{/}`Y'

  const format = (date: Date) => {
    if (!date) return ''
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return [day, month, year].join('/')
  }

  const parse = (str: string) => {
    const [day, month, year] = str.split('/').map(Number)
    return new Date(year, month - 1, day)
  }

  const { ref } = useIMask({
    mask: Date,
    pattern: pattern,
    format: (value: any) => format(value),
    parse: (value: any) => parse(value),
  })

  return <StandardInput reference={ref} label={label} {...rest} />
}

export { DateInput }
