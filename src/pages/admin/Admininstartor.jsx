import React from 'react';
import style from './Administrator.module.css';
import { useState, useEffect } from 'react';
import { getProducts } from '../../api/productApi';
import ProductCard from '../../components/admin/ProductCard';
import { Outlet, Link, useMatch, NavLink } from 'react-router-dom';
import { AiOutlineProject, AiOutlineSchedule, AiOutlineBarChart } from 'react-icons/ai';
import styled from 'styled-components';

const AdminPage = styled.section`
  padding-top: 50px;
`;
const Inner = styled.div`
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;
const PageTitle = styled.h2`
  font-size: 18px;
  margin: 30px 20px;
`;
const Nav = styled.ul`
  display: flex;
  justify-content: center;
  font-size: 16px;
  gap: 20px;
  padding: 30px;
  a {
    &.active {
      li {
        /* color: var(--color-grey); */
        color: var(--color-black2);
        /* background-color: rgba(0, 0, 0, 0.1); */
      }
    }
    li {
      padding: 0 10px;
      height: 30px;
      width: auto;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      color: var(--color-light-grey);

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
export default function Administrator() {
  return (
    <AdminPage>
      <Inner>
        <PageTitle>관리자 페이지</PageTitle>
        <Nav>
          <NavLink to="products">
            <li>
              <AiOutlineSchedule />
              상품 관리
            </li>
          </NavLink>
          <NavLink to="transactions">
            <li>
              <AiOutlineBarChart />
              거래내역
            </li>
          </NavLink>
        </Nav>
        <Outlet />
      </Inner>
    </AdminPage>
  );
}
