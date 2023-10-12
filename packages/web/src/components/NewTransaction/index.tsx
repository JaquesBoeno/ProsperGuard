import React, { useContext } from 'react'

// Components
import { StandardInput } from '../Input'
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
            <StandardInput label="Nome" {...register('name')} />
            <StandardInput label="Descrição" {...register('description')} />
            <CurrencyInput label="Valor" {...register('value')} />
            <DateInput label="Data" {...register('date')} />
          </div>
          <Button color="green" type="submit" title="Adicionar transação" />
          <Button color="red" type="button" title="Cancelar" />
        </form>
      </div>
    </div>
  )
}

export { NewTransaction }
