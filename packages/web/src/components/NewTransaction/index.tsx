import React from 'react'

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

  const onSubmit: SubmitHandler<createTransactionFormData> = (data) => {
    console.log(data)
  }

  return (
    <div className="NewTransaction">
      <div className="inputs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <StandardInput label="Tipo" {...register('type')} />
            <StandardInput label="Nome" {...register('name')} />
            <StandardInput label="Descrição" {...register('description')} />
            <CurrencyInput label="Valor" {...register('value')} />
            <DateInput label="Data" {...register('date')} />
          </div>
          <Button type="submit">Adicionar transação</Button>
        </form>
      </div>
    </div>
  )
}

export { NewTransaction }
