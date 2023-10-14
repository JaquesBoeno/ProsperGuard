import React, { useContext } from 'react'

// Components
import { Input, StandardInput } from '../Input'
import { CurrencyInput } from '../Input/CurrencyInput'
import { DateInput } from '../Input/DateInput'
import { Button } from '../Button'

// Form Imports
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

import './styles.scss'
import { TransactionContext } from '../../contexts/TransactionContext'
import { SelectInput } from '../Input/SelectInput'

const createTransactionSchema = z.object({
  type: z.string(),
  name: z.string(),
  description: z.string(),
  value: z.string().transform((str) => {
    return Number(str.replace(/\D/g, '')) / 100
  }),
  date: z.string(),
})

type createTransactionFormData = z.infer<typeof createTransactionSchema>

const NewTransaction: React.FC = () => {
  const { register, handleSubmit } = useForm<createTransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
  })

  const { createTransaction } = useContext(TransactionContext)

  const onSubmit: SubmitHandler<createTransactionFormData> = ({ ...props }) => {
    createTransaction({ ...props })
  }

  return (
    <div className="NewTransaction">
      <h2>Criar transação</h2>
      <div className="inputs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <SelectInput
              label="Tipo"
              options={[
                { name: 'Entrada', value: 'income' },
                { name: 'Saída', value: 'expense' },
              ]}
              {...register('type')}
            />
            <Input type="text" label="Nome" {...register('name')} />
            <Input type="text" label="Descrição" {...register('description')} />
            <Input type="currency" label="Valor" {...register('value')} />
            <Input type="date" label="Data" {...register('date')} />
          </div>
          <div className="buttons">
            <Button color="red" type="reset" title="Cancelar" />
            <Button color="green" type="submit" title="Adicionar transação" />
          </div>
        </form>
      </div>
    </div>
  )
}

export { NewTransaction }
