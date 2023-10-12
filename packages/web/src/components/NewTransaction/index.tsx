import React from 'react'
import './styles.scss'
import { Input, StandardInput } from '../Input'
import { Button } from '../Button'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { CurrencyInput } from '../Input/CurrencyInput'

interface Inputs {
  type: string
  name: string
  description: string
  transaction: string
  date: string
}

const NewTransaction: React.FC = () => {
  const { register, control, handleSubmit, watch } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <div className="NewTransaction">
      <div className="inputs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="transaction"
            control={control}
            render={({ field }) => (
              <Input inputType="Currency" key={1} label="Valor" {...field} />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Input inputType="Date" label="Data" {...field} />
            )}
          />
          {/* <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Input inputType="Text" label="Tipo" {...field} />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input inputType="Text" label="Nome" {...field} />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input inputType="Text" label="Descrição" {...field} />
            )}
          />
          <Controller
            name="transaction"
            control={control}
            render={({ field }) => (
              <Input inputType="Currency" key={1} label="Valor" {...field} />
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <Input inputType="Date" label="Data" {...field} />
            )}
          /> */}
          <input type="submit" />
        </form>
        <CurrencyInput label="Valor" />
      </div>
      <Button>Adicionar transação</Button>
      <Button>Cancelar</Button>
    </div>
  )
}

export { NewTransaction }
