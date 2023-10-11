import React from 'react'

import './styles.scss'
import { Input } from '../Input'
import { Button } from '../Button'

const NewTransaction: React.FC = () => {
  return (
    <div className="NewTransaction">
      <div className="inputs">
        <Input inputType="Text" label="Tipo" />
        <Input inputType="Text" label="Nome" />
        <Input inputType="Text" label="Descrição" />
        <Input inputType="Currency" label="valor" />
        <Input inputType="Date" label="Data" />
      </div>
      <Button>Adicionar transação</Button>
      <Button>Cancelar</Button>
    </div>
  )
}

export { NewTransaction }
