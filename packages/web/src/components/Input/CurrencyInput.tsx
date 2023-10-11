import React from 'react'

import './styles.scss'
import { useIMask } from 'react-imask'
import { StandardInput } from '.'

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string
}

const CurrencyInput: React.FC<Props> = ({ label, ...rest }) => {
  const { ref } = useIMask({
    mask: 'R$ num',
    lazy: false,
    blocks: {
      num: {
        mask: Number,
        scale: 2,
        thousandsSeparator: '.',
        padFractionalZeros: true,
        radix: ',',
        mapToRadix: ['.'],
      },
    },
  })

  return <StandardInput reference={ref} label={label} {...rest} />
}

export { CurrencyInput }
