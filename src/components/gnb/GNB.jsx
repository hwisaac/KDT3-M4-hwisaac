import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './GNB.module.css';
import PageLink from './PageLink';
import GnbDepth from './GnbDepth';

const GNB = () => {
  const [routerLink, setLink] = useState(['/best', '/agriculturalproducts', '/marineproducts', '/livestockproducts', '/processedfood', '/allproducts'])
  const [page, setPage] = useState(['베스트', '농산물', '수산물', '축산물', '가공식품', '전체상품'])
  return (
    <nav className={style.nav}>
      <ul className={style.inner}>
        {
          routerLink.map((a, i)=>{
            return <li key={i} className={`${routerLink[i].substring(1)}`}><PageLink routerLink={routerLink[i]} page={page[i]}/></li>
          })
        }
      </ul>
      <GnbDepth /> 
    </nav>
  );
};

export default GNB;
