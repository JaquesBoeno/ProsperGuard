import React, { useContext, useEffect } from 'react'

// Components
import { Input } from '../Input'
import { Button } from '../Button'
import { CgClose } from 'react-icons/cg'
import { AiOutlinePlus } from 'react-icons/ai'

// Form Imports
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'

import './styles.scss'
import { TransactionContext } from '../../contexts/TransactionContext'
import { SelectInput } from '../Input/SelectInput'

const createTransactionSchema = z.object({
  type: z.string(),
  name: z.string(),
  description: z.string(),
  value: z.string().transform(str => {
    return Number(str.replace(/\D/g, '')) / 100
  }),
  date: z.string(),
  tags: z
    .array(
      z.object({
        name: z.string(),
      })
    )
    .refine(tags => {
      return (
        new Set(
          tags.map(tag => {
            return tag.name
          })
        ).size == tags.length
      )
    }, 'não repita tags'),
})

type createTransactionFormData = z.infer<typeof createTransactionSchema>

const NewTransaction: React.FC = () => {
  const { createTransaction } = useContext(TransactionContext)
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<createTransactionFormData>({
    resolver: zodResolver(createTransactionSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'tags',
  })

  const appendTag = () => {
    append({
      name: '',
    })
  }

  const onSubmit: SubmitHandler<createTransactionFormData> = props => {
    createTransaction(props)
  }

  return (
    <div className="NewTransaction">
      <h2>Criar transação</h2>
      <div className="inputs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <SelectInput
              label="Tipo"
              errors={errors.type?.message}
              options={[
                { name: '⬇️ Entrada', value: 'income' },
                { name: '⬆️ Saída', value: 'expense' },
              ]}
              {...register('type')}
            />
            <Input type="text" label="Nome" errors={errors.name?.message} {...register('name')} />
            <Input
              type="text"
              label="Descrição"
              errors={errors.description?.message}
              {...register('description')}
            />
            <Input
              type="currency"
              label="Valor"
              errors={errors.value?.message}
              {...register('value')}
            />
            <Input type="date" label="Data" errors={errors.date?.message} {...register('date')} />
          </div>
          <div className="tagsRow">
            {fields.map((field, index) => {
              return (
                <div className="tag" key={field.id}>
                  <SelectInput
                    label="Tag"
                    options={[
                      { name: 'comida', value: 'food' },
                      { name: 'lazer', value: 'leisure' },
                    ]}
                    {...register(`tags.${index}.name`)}
                  />
                  <Button onClick={() => remove(index)}>
                    <CgClose />
                  </Button>
                </div>
              )
            })}
          </div>
          <div className="buttons">
            <div>
              <Button onClick={appendTag}>Adicionar Tag +</Button>
              <span>{errors.tags?.message}</span>
            </div>
            <div>
              <Button color="red" type="reset" onClick={() => reset({ type: '', tags: [] })}>
                Cancelar
              </Button>
              <Button color="green" type="submit">
                Adicionar transação
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export { NewTransaction }
