import React from 'react'

import './styles.scss'
import { StandardInput } from '../Input'
import { CurrencyInput } from '../Input/CurrencyInput'
import { Button } from '../Button'
import { DateInput } from '../Input/DateInput'

const NewTransaction: React.FC = () => {
  return (
    <div className="NewTransaction">
      <div className="inputs">
        <StandardInput label="Tipo" />
        <StandardInput label="Nome" />
        <StandardInput label="Descrição" />
        <CurrencyInput label="valor" />
        <DateInput label="Data" />
      </div>
      <Button>Adicionar transação</Button>
      <Button>Cancelar</Button>
    </div>
  )
}

export { NewTransaction }
