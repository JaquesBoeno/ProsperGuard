import React, { useState } from 'react'

import { Input } from '../../components/Input'
import { SelectInput } from '../Input/SelectInput'
import { Button } from '../Button'

import { Line } from 'react-chartjs-2'
import {
  EquivalenceOfFees,
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

import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import './styles.scss'
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
    return Number(value.replace(/[^0-9,]/g, '').replace(',', '.'))
  }),
  monthlyContribution: z.string().transform((value) => {
    return Number(value.replace(/[^0-9,]/g, '').replace(',', '.'))
  }),
  interest: z.string().transform((value) => {
    return Number(value.replace(/[^0-9,]/g, '').replace(',', '.')) / 100
  }),
  typeOfInterestPeriod: z.string(),
  time: z.string().transform((value) => {
    return Number(value.replace(/\D/g, ''))
  }),
  typeOfTimePeriod: z.string(),
})

type calcCompoundInterestFormData = z.infer<typeof calcCompoundInterestSchema>

const CompoundInterestCalculator: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<calcCompoundInterestFormData>({
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
    typeOfInterestPeriod,
    typeOfTimePeriod,
  }) => {
    let convertedInterest = 0
    let convertedTime = 0

    if (typeOfInterestPeriod == 'yearly') {
      convertedInterest = EquivalenceOfFees(interest, 'yearlyToMonthly')
    } else if (typeOfInterestPeriod == 'monthly') {
      convertedInterest = interest
    }

    if (typeOfTimePeriod == 'yearly') {
      convertedTime = time * 12
    } else if (typeOfTimePeriod == 'monthly') {
      convertedTime = time
    }

    setResults(
      FvWithMonthlyAndInitial(
        initialValue,
        monthlyContribution,
        convertedInterest,
        convertedTime
      )
    )

    // chart calcs
    if (
      initialValue &&
      monthlyContribution &&
      convertedInterest &&
      convertedTime
    ) {
      let tempData = []
      // calc yearly
      if (convertedTime >= 120 && convertedTime % 12 == 0) {
        for (let i = 0; i <= convertedTime / 12; i++) {
          tempData.push(
            FvWithMonthlyAndInitial(
              initialValue,
              monthlyContribution,
              convertedInterest,
              i * 12
            )
          )
        }
      }
      // calc monthly
      else {
        for (let i = 0; i < convertedTime; i++) {
          tempData.push(
            FvWithMonthlyAndInitial(
              initialValue,
              monthlyContribution,
              convertedInterest,
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
          <Input
            type="currency"
            label="Valor Inicial"
            {...register('initialValue')}
          />
          <Input
            type="currency"
            label="Aporte Mensal"
            {...register('monthlyContribution')}
          />
          <div className="wrapper">
            <Input type="percent" label="Juros" {...register('interest')} />
            <SelectInput
              label="Período"
              options={[
                { name: 'Mensal', value: 'monthly', selected: true },
                { name: 'Anual', value: 'yearly' },
              ]}
              {...register('typeOfInterestPeriod')}
            />
          </div>
          <div className="wrapper">
            <Input type="number" label="Período" {...register('time')} />
            <SelectInput
              label="Período"
              options={[
                { name: 'Meses', value: 'monthly', selected: true },
                { name: 'Anos', value: 'yearly' },
              ]}
              {...register('typeOfTimePeriod')}
            />
          </div>
        </div>
        <Button type="submit" title="Calcular" />
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
