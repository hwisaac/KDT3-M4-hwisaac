import React from 'react';
import style from './Administrator.module.css';
import { useState, useEffect } from 'react';
import { getProducts } from '../data/API';
import ProductCard from '../components/administrator/ProductCard';
import { Outlet, Link, useMatch } from 'react-router-dom';
import { AiOutlineProject, AiOutlineSchedule } from 'react-icons/ai';

export default function Administrator() {
  const matchProducts = useMatch('/admin/products');
  const matchSales = useMatch('/admin/transactions');
  return (
    <section className={style.adminPage}>
      <div className={style.inner}>
        <h2 className={style.pageTitle}>관리자 페이지</h2>
        <ul className={style.nav}>
          <Link to="products">
            <li className={matchProducts && style.focus}>
              <AiOutlineSchedule />
              상품 관리
            </li>
          </Link>
          {/* <Link to="sales">
            <li className={matchSales ? style.focus : null}>
              {' '}
              <AiOutlineProject />
              판매내역
            </li>
          </Link> */}
          <Link to="transactions">
            <li className={matchSales && style.focus}>transact</li>
          </Link>
        </ul>
        <Outlet />
      </div>
    </section>
  );
}
