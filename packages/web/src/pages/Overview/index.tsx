import React, { useContext, useState } from 'react'

import './styles.scss'
import { Transaction } from '../../components/Transaction'
import { Button } from '../../components/Button'
import { NewTransaction } from '../../components/NewTransaction'
import { TransactionContext } from '../../contexts/TransactionContext'

const Overview: React.FC = () => {
  const { transactions } = useContext(TransactionContext)

  const [showNewTransaction, toggleShowNewTransaction] = useState(false)

  return (
    <div className="OverviewPage">
      <section>
        <h1>Visão geral</h1>
      </section>
      <section>
        <h1>Entradas e Saídas</h1>
        <Button
          onClick={() => toggleShowNewTransaction(true)}
          title="Criar Transação"
        />

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
