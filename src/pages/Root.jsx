import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import GNB from '../components/gnb/GNB';

export default function Root() {
  return (
    <div>
      <Header/>
      <Outlet />
    </div>
  );
}

