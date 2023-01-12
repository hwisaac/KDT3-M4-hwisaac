import React from 'react';
import style from './Transactions.module.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getTransactionsAll } from '../../api/productApi';

import { useMutation, useQuery, QueryClient } from '@tanstack/react-query';
import LoadingModal from '../../components/ui/loading/LoadingModal';
import TransactionCard from '../../components/admin/TransactionCard';
import OverviewCard from './OverviewCard';
import BankIcon from '../../components/ui/bank-icon/BankIcon';
import { useQueryClient } from '@tanstack/react-query';

const Transactions = () => {
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalCanceled, setTotalCanceled] = useState(0);
  const [totalDone, setTotalDone] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const queryClient = useQueryClient();

  const { isFetching, isLoading, data, refetch } = useQuery(['transactions'], getTransactionsAll, {
    staleTime: 15 * 1000,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    onSuccess: async (data) => {
      // 배송료 제외한 배열로
      await setFilteredTransactions(data.filter((transaction) => transaction.product.title.trim() !== '배송비'));
    },
  });
  useEffect(() => {
    const tranData = queryClient.getQueryData(['transactions']);
    if (tranData) {
      setFilteredTransactions(data.filter((transaction) => transaction.product.title.trim() !== '배송비'));
    }
  }, []);
  useEffect(() => {
    // compute overview Data
    const numOfTransactions = filteredTransactions.length;
    const numOfEarn = filteredTransactions
      .map((transaction) => transaction.product.price)
      .map(Number)
      .reduce((sum, price) => sum + price, 0);
    const numOfDone = filteredTransactions.filter((transaction) => transaction.done).length;
    const numOfCanceled = filteredTransactions.filter((transaction) => transaction.isCanceled).length;

    // overview 데이터 업데이트
    setTotalTransactions(numOfTransactions);
    setTotalEarned(numOfEarn);
    setTotalDone(numOfDone);
    setTotalCanceled(numOfCanceled);
    console.log('총거래', numOfTransactions, '수익', numOfEarn, 'done', numOfDone, '취소', numOfCanceled);
  }, [filteredTransactions]);

  // console.log('거래내역', data);

  return (
    <>
      {isFetching && <LoadingModal />}
      <div className={style.overview}>
        <OverviewCard title={'Total transactions'} content={totalTransactions} />
        <OverviewCard title={'Earned'} content={totalEarned} />
        <OverviewCard title={'Canceled'} content={totalCanceled} />
        <OverviewCard title={'Done'} content={totalDone} />
      </div>

      <ul className={style.transactionsList}>
        <TransactionCard
          payload={{
            tableHeader: true,
            tableFooter: false,
          }}
        />
        {!isFetching &&
          filteredTransactions?.map((transaction, index) => {
            const { account, detailId, done, isCanceled, product, timePaid, user } = transaction;

            return (
              <TransactionCard
                key={detailId}
                payload={{
                  index,
                  done,
                  isCanceled,
                  timePaid,
                  product,
                  user,
                  account,
                  detailId,
                  tableHeader: false,
                  tableFooter: false,
                }}
              />
            );
          })}
        <TransactionCard
          payload={{
            tableFooter: true,
            tableHeader: false,
          }}
        />
      </ul>
    </>
  );
};

export default Transactions;
