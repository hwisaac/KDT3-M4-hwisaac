import React from 'react';
import { Link } from 'react-router-dom';

function GnbDepth(props) {
  // if (props.category.mainCategory === props.targetGnb){
  //   console.log(props.category.subCategory)
  // }

  return (
    <>
      {props.links.mainLink === props.targetGnb
        ? props.links.subLink &&
          props.links.subLink.map((link, i) => {
            return (
              <Link to={`/category/${link}`} state={{ name: props.links.subName[i] }} key={i}>
                {props.links.subName[i]}
              </Link>
            );
          })
        : ''}
    </>
  );
}
export default GnbDepth;
