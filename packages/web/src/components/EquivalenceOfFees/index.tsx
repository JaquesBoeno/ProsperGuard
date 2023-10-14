import React, { useState } from 'react'
import { EquivalenceOfFees as formula } from '../../utils/formulasFinancialMathematics'

import './styles.scss'
import { Input } from '../Input'
import { SelectInput } from '../Input/SelectInput'
import { Button } from '../Button'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const EquivalenceOfFeesSchema = z.object({
  interest: z.string().transform((value) => {
    return Number(value.replace(/[^0-9,]/g, '').replace(',', '.')) / 100
  }),
  to: z.enum(['yearlyToMonthly', 'monthlyToYearly']),
})

type EquivalenceOfFessFormData = z.infer<typeof EquivalenceOfFeesSchema>

const EquivalenceOfFees: React.FC = () => {
  const { register, handleSubmit } = useForm<EquivalenceOfFessFormData>({
    resolver: zodResolver(EquivalenceOfFeesSchema),
  })

  const [result, setResult] = useState<number>()

  const onSubmit: SubmitHandler<EquivalenceOfFessFormData> = ({
    interest,
    to,
  }) => {
    setResult(formula(interest, to))
  }

  return (
    <section className="EquivalenceOfFees">
      <h1>Equivalência de Juros</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="percent" label="Juros" {...register('interest')} />
        <SelectInput
          label="Converter para..."
          options={[
            { name: 'De ano para mês', value: 'yearlyToMonthly' },
            { name: 'De mês para ano', value: 'monthlyToYearly' },
          ]}
          {...register('to')}
        />
        <Button type="submit">Converter</Button>
        <div>
          <p>Taxa Convertida: {result && (result * 100).toFixed(2)} %</p>
        </div>
      </form>
    </section>
  )
}

export { EquivalenceOfFees }
