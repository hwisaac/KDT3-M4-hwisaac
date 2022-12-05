import React from 'react';
import { useState } from 'react';
import style from './GnbDepth.module.css'
import PageLink from './PageLink';

function GnbDepth() {
  const [agriLink, setAgriLink] = useState(['/fruits', '/vegetables', '/grain', '/sweetPotato'])
  const [agriPage, setAgriPage] = useState(['과일', '채소', '곡물', '고구마관련 상품'])
  const [marineLink, setMarineLink] = useState(['/sesonalMarine', '/driedFish'])
  const [marinePage, setMarinePage] = useState(['제철 수산물', '건어물 상품'])
  const [processedLink, setProcessedLink] = useState(['/ordinaryProcessed', '/sideDish', '/tea', '/honey', '/snack'])
  const [processedPage, setProcessedPage] = useState(['일반가공식품', '반찬,장아찌', '차류', '벌꿀관련 상품', '간편간식 상품'])
  return (
    <div className={style.displayBox}>
      <div className={style.inner}>
        <ul className={style.agriDep}>
        {
          agriLink.map((a, i) => {
            return <li key={i}><PageLink routerLink={agriLink[i]} page={agriPage[i]}/></li>
          })
        }
        </ul>
        <ul className={style.marineDep}>
        {
          marineLink.map((a, i) => {
            return <li key={i}><PageLink routerLink={marineLink[i]} page={marinePage[i]}/></li>
          })
        }
        </ul>
        <ul className={style.processedDep}>
        {
          processedLink.map((a, i) => {
            return <li key={i}><PageLink routerLink={processedLink[i]} page={processedPage[i]}/></li>
          })
        }
        </ul>
      </div>
    </div>
  );
}

export default GnbDepth;