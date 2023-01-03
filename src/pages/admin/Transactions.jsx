import React from 'react';
import style from './Transactions.module.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTransactionsAll } from '../../api/productApi';

import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import TransactionCard from '../../components/admin/TransactionCard';
import OverviewCard from './OverviewCard';
import BankIcon from '../../components/ui/bank-icon/BankIcon';

const Transactions = () => {
  let tableFooter = false;
  let tableHeader = false;
  const getData = async () => {
    return fetch('../data/mockUpTransactions.json', {
      headers: {
        Accept: 'application / json',
      },
    }).then((res) => {
      const result = res.json();
      return result;
    });
  };

  const { isLoading, data, refetch } = useQuery(['transactions'], () => getData());

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <>
      <div className={style.overview}>
        <OverviewCard title={'Total transactions'} content={2420} />
        <OverviewCard title={'Earned'} content={300000} />
        <OverviewCard title={'Canceled'} content={100} />
        <OverviewCard title={'Done'} content={30} />
      </div>

      <ul className={style.transactionsList}>
        <TransactionCard
          payload={{
            tableHeader: true,
            tableFooter,
          }}
        />
        {!isLoading &&
          data?.map((transaction, index) => {
            const { account, detailId, done, isCanceled, product, timePaid, user } = transaction;

            return (
              <TransactionCard
                key={detailId}
                payload={{
                  account,
                  detailId,
                  done,
                  isCanceled,
                  product,
                  timePaid,
                  user,
                  index,
                  tableHeader,
                  tableFooter,
                }}
              />
            );
          })}
        <TransactionCard
          payload={{
            tableFooter: true,
            tableHeader,
          }}
        />
      </ul>
    </>
  );
};

export default Transactions;
