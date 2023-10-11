import React from 'react'

import './styles.scss'
import { StandardInput } from '../Input'
import { CurrencyInput } from '../Input/CurrencyInput'
import { Button } from '../Button'

const NewTransaction: React.FC = () => {
  return (
    <div className="NewTransaction">
      <div className="inputs">
        <StandardInput label="Tipo" />
        <StandardInput label="Nome" />
        <StandardInput label="Descrição" />
        <CurrencyInput label="valor" />
        <StandardInput label="data" />
      </div>
      <Button>Adicionar transação</Button>
      <Button>Cancelar</Button>
    </div>
  )
}

export { NewTransaction }
