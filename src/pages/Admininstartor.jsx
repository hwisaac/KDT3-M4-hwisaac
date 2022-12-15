import React from 'react';
import style from './Administrator.module.css';
import { useState, useEffect } from 'react';
import { getProducts } from '../data/API';
import ProductCard from '../components/administrator/ProductCard';
import { Outlet, Link } from 'react-router-dom';

export default function Administrator() {
  return (
    <section className={style.inner}>
      <h2 className={style.pageTitle}>관리자 페이지</h2>
      <ul className={style.nav}>
        <li>
          <Link to="products">상품 관리</Link>
        </li>
        <li>
          <Link to="sales">판매내역</Link>
        </li>
        <li>
          <Link to="transactions">거래 내역</Link>
        </li>
      </ul>
      <Outlet />
    </section>
  );
}
