import React from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import style from './GNB.module.css';
import GnbDepth from './GnbDepth';

const GNB = () => {
  const LINKS = [
    { mainLink: '베스트', subLink: null },
    {
      mainLink: '농산물',
      subLink: ['과일', '채소', '곡물'],
    },
    { mainLink: '수산물', subLink: ['제철', '건어물'] },
    { mainLink: '축산물', subLink: null },
    {
      mainLink: '가공식품',
      subLink: ['일반', '반찬', '차류', '벌꿀', '간편간식'],
    },
    { mainLink: '전체상품', subLink: null },
  ];

  const [isHovering, setIsHovering] = useState(false);
  const [targetGnb, setTargetGnb] = useState('');

  const handleMouseOver = (event) => {
    setIsHovering(true);
    // console.log(e.target.nodeName);
    if(event.target.nodeName === 'A'){
      setTargetGnb(event.target.dataset.link)
    } else return
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
  console.log(isHovering)
  return (
    <nav className={style.nav}>
      <ul className={style.inner} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {LINKS.map((link, i) => {
          return (
            <li className={style.gnbList} key={i}>
              <Link to={`/category/${link.mainLink}`} data-link ={link.mainLink}>
                {link.mainLink}
              </Link>
              {isHovering ? (
                <ul className={style.twoDep} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  <GnbDepth targetGnb={targetGnb} links={link}/>
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

