import React, { useState } from 'react'

import { CurrencyInput } from '../../components/Input/CurrencyInput'
import { StandardInput } from '../../components/Input'
import { Line } from 'react-chartjs-2'
import {
  FvWithMonthlyAndInitial,
  Results,
} from '../../utils/formulasFinancialMathematics'

import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  Filler,
} from 'chart.js'

import { formatDigits } from '../../utils/formatNumber'

import './styles.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../Button'

interface DataInterface {
  fv: Array<Number>
  totalInvested: Array<Number>
  labels: Array<String>
}

ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  Filler
)

const calcCompoundInterestSchema = z.object({
  initialValue: z.string().transform((value) => {
    return Number(value.replace(/\D/g, '')) / 100
  }),
  monthlyContribution: z.string().transform((value) => {
    return Number(value.replace(/\D/g, '')) / 100
  }),
  interest: z.string().transform((value) => {
    return Number(value.replace(/\D/g, ''))
  }),
  time: z.string().transform((value) => {
    return Number(value.replace(/\D/g, ''))
  }),
})

type calcCompoundInterestFormData = z.infer<typeof calcCompoundInterestSchema>

const CompoundInterestCalculator: React.FC = () => {
  const { register, handleSubmit } = useForm<calcCompoundInterestFormData>({
    resolver: zodResolver(calcCompoundInterestSchema),
  })

  const [data, setData] = useState<DataInterface>({
    fv: [0],
    totalInvested: [0],
    labels: ['0'],
  })
  const [results, setResults] = useState<Results>()

  const submitCalc: SubmitHandler<calcCompoundInterestFormData> = ({
    initialValue,
    monthlyContribution,
    interest,
    time,
  }) => {
    setResults(
      FvWithMonthlyAndInitial(initialValue, monthlyContribution, interest, time)
    )

    // chart calcs
    if (initialValue && monthlyContribution && interest && time) {
      let tempData = []
      // calc yearly
      if (time >= 120 && time % 12 == 0) {
        for (let i = 0; i <= time / 12; i++) {
          tempData.push(
            FvWithMonthlyAndInitial(
              initialValue,
              monthlyContribution,
              interest,
              i * 12
            )
          )
        }
      }
      // calc monthly
      else {
        for (let i = 0; i < time; i++) {
          tempData.push(
            FvWithMonthlyAndInitial(
              initialValue,
              monthlyContribution,
              interest,
              i
            )
          )
        }
      }
      setData({
        fv: tempData.map((i) => {
          return i.fv
        }),
        totalInvested: tempData.map((i) => {
          return i.totalInvested
        }),
        labels: tempData.map((_i, key) => {
          return key.toString()
        }),
      })
    }
  }

  return (
    <section className="CompoundInterest">
      <h1>Calculo de Juros Compostos</h1>

      <form onSubmit={handleSubmit(submitCalc)}>
        <div className="InputsWrapper">
          <CurrencyInput label="Valor Inicial" {...register('initialValue')} />
          <CurrencyInput
            label="Aporte Mensal"
            {...register('monthlyContribution')}
          />
          <StandardInput label="Juros (ao mês)" {...register('interest')} />
          <StandardInput label="Período (em meses)" {...register('time')} />
        </div>
        <Button type="submit">Calcular</Button>
      </form>

      <div className="results">
        <p>
          Valor investido <br />
          <span>R$ {formatDigits(results?.totalInvested)}</span>
        </p>
        <p>
          Valor final
          <br /> <span>R$ {formatDigits(results?.fv)}</span>
        </p>
        <p>
          Dividendos <br />
          <span>R$ {formatDigits(results?.totalDividends)}</span>
        </p>
      </div>

      <div className="graph">
        <Line
          datasetIdKey="CompoundInterestGraph"
          data={{
            labels: data.labels,
            datasets: [
              {
                label: 'valor investido',
                data: data.totalInvested,
                fill: true,
                backgroundColor: 'rgb(75, 192, 192,0.5)',
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
              {
                label: 'valor total',
                data: data.fv,
                fill: true,
                backgroundColor: 'rgb(156, 204, 101,0.5)',
                borderColor: 'rgb(156, 204, 101)',
                tension: 0.1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </section>
  )
}

export { CompoundInterestCalculator }
