import React, { useEffect, useState } from 'react'

import './styles.scss'
import { Transaction, TransactionType } from '../../components/Transaction'
import { Button } from '../../components/Button'
import { NewTransaction } from '../../components/NewTransaction'

const Overview: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionType[]>([
    {
      type: 'expense',
      name: 'Açaí',
      description: 'Acaí que comprei no CAECA',
      value: 10,
      date: '30/09',
    },
    {
      type: 'expense',
      name: 'Açaí',
      description: 'Acaí que comprei no CAECA',
      value: 10,
      date: '30/09',
    },
    {
      type: 'expense',
      name: 'Açaí',
      description: 'Acaí que comprei no CAECA',
      value: 10,
      date: '30/09',
    },
    {
      type: 'expense',
      name: 'Açaí',
      description: 'Acaí que comprei no CAECA',
      value: 10,
      date: '30/09',
    },
  ])
  const [showNewTransaction, toggleShowNewTransaction] = useState(false)

  return (
    <div className="OverviewPage">
      <section>
        <h1>Visão geral</h1>
      </section>
      <section>
        <h1>Entradas e Saídas</h1>
        <Button onClick={() => toggleShowNewTransaction(true)}>
          Criar Transação
        </Button>

        {showNewTransaction && <NewTransaction />}

        {transactions != null ? (
          transactions.map((transaction, index) => {
            return (
              <Transaction
                key={index}
                type={transaction.type}
                name={transaction.name}
                description={transaction.description}
                value={transaction.value}
                date={transaction.date}
              />
            )
          })
        ) : (
          <p>Voce não tem nenhuma transação cadastrada</p>
        )}
      </section>
    </div>
  )
}

export { Overview }
