import React from 'react';
import style from './Transactions.module.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTransactionsAll } from '../../data/API';
import transactions from '../../data/mockUpTransactions.json';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingModal from '../loading/LoadingModal';

const Transactions = () => {
  const { isLoading, data, refetch } = useQuery(['transactions'], () => transactions);

  // useEffect(() => {

  // }, []);

  return (
    <ul className={style.transactionsList}>
      {!isLoading &&
        data?.map((transaction) => {
          const { account, detailId, done, isCanceled, product, timePaid, user } = transaction;
          <li>
            
          </li>
          console.log({ account, detailId, done, isCanceled, product, timePaid, user });
        })}
    </ul>
  );
};

export default Transactions;
