import React from 'react';
import { useState } from 'react';
import style from './GnbDepth.module.css';
import PageLink from './PageLink';
import { Link } from 'react-router-dom';

function GnbDepth() {
  // const [agriLink, setAgriLink] = useState(['/fruits', '/vegetables', '/grain', '/sweetPotato'])
  // const [agriPage, setAgriPage] = useState(['과일', '채소', '곡물', '고구마관련 상품'])
  // const [marineLink, setMarineLink] = useState(['/sesonalMarine', '/driedFish'])
  // const [marinePage, setMarinePage] = useState(['제철 수산물', '건어물 상품'])
  // const [processedLink, setProcessedLink] = useState(['/ordinaryProcessed', '/sideDish', '/tea', '/honey', '/snack'])
  // const [processedPage, setProcessedPage] = useState(['일반가공식품', '반찬,장아찌', '차류', '벌꿀관련 상품', '간편간식 상품'])
  return (
    <div className={style.displayBox}>
      <div className={style.inner}>
        <ul className={style.agriDep}>
          {/* {
          agriLink.map((a, i) => {
            return <li key={i}><PageLink routerLink={agriLink[i]} page={agriPage[i]}/></li>
          })
        } */}
          <li>
            <Link to={`/category/과일`}>과일</Link>
          </li>
          <li>
            <Link to={`/category/채소`}>채소</Link>
          </li>
          <li>
            <Link to={`/category/곡물`}>곡물</Link>
          </li>
        </ul>
        <ul className={style.marineDep}>
          {/* {
          marineLink.map((a, i) => {
            return <li key={i}><PageLink routerLink={marineLink[i]} page={marinePage[i]}/></li>
          })
        } */}
          <li>
            <Link to={`/category/제철`}>제철 수산물</Link>
          </li>
          <li>
            <Link to={`/category/건어물`}>건어물 상품</Link>
          </li>
        </ul>
        <ul className={style.processedDep}>
          {/* {
          processedLink.map((a, i) => {
            return <li key={i}><PageLink routerLink={processedLink[i]} page={processedPage[i]}/></li>
          })
        } */}
          <li>
            <Link to={`/category/일반`}>일반가공식품</Link>
          </li>
          <li>
            <Link to={`/category/반찬`}>반찬, 장아찌</Link>
          </li>
          <li>
            <Link to={`/category/차류`}>차류</Link>
          </li>
          <li>
            <Link to={`/category/벌꿀`}>벌꿀관련 상품</Link>
          </li>
          <li>
            <Link to={`/category/간편간식`}>간편간식 상품</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default GnbDepth;
