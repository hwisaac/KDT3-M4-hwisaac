import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './GNB.module.css';
import GnbDepth from './GnbDepth';

const GNB = () => {
  const LINKS = [
    { mainLink: '베스트', subLink: null, subName: null },
    {
      mainLink: '농산물',
      subLink: ['과일', '채소', '곡물'],
      subName: ['과일', '채소', '곡물'],
    },
    { mainLink: '수산물', subLink: ['제철', '건어물'], subName: ['제철 수산물', '건어물 상품'] },
    { mainLink: '축산물', subLink: null, subName: null },
    {
      mainLink: '가공식품',
      subLink: ['일반', '반찬', '차류', '벌꿀', '간편간식'],
      subName: ['일반가공식품', '반찬, 장아찌', '차류', '벌꿀', '간편간식'],
    },
    { mainLink: '전체상품', subLink: null, subName: null },
  ];

  const [isHovering, setIsHovering] = useState(false);
  const [targetGnb, setTargetGnb] = useState('');

  const handleMouseOver = (event) => {
    setIsHovering(true);
    // console.log(e.target.nodeName);
    // if (event.target.nodeName === 'A') {
    // } else return;
    if (event.target.dataset.link === undefined) return;
    setTargetGnb(event.target.dataset.link);
    // console.log(event.target.dataset.link);
    const {
      currentTarget: {
        dataset: { link },
      },
    } = event;
    console.log(link);
    // console.log(targetSubMenu);
    // setTargetSubMenu(e.target.dataset.catetoryItem);
    // console.log(e.target.dataset.catetoryItem)
    // console.log('호버되었습니다')
  };

  // console.log('targetGnb',targetGnb);

  const handleMouseOut = (event) => {
    setIsHovering(false);
    // if(e.target.nodeName === 'A' || 'LI'){
    //   setIsHovering(true);
    // }
    // setIsHovering(false);
    // setTargetGnb('')
  };
  console.log(isHovering);
  return (
    <nav className={style.nav}>
      <ul className={style.inner}>
        {LINKS.map((link, i) => {
          return (
            <li
              className={style.gnbList}
              key={i}
              data-link={link.mainLink}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <Link to={`/category/${link.mainLink}`} data-link={link.mainLink}>
                {link.mainLink}
              </Link>
              {isHovering ? (
                <ul className={style.twoDep} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  <GnbDepth targetGnb={targetGnb} links={link} />
                </ul>
              ) : (
                ''
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default GNB;
