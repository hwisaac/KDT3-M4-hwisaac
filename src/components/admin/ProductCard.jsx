import React from 'react';
import style from './ProductCard.module.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteProduct } from '../../api/productApi';
import { MdHideImage } from 'react-icons/md';
import { useMutation } from '@tanstack/react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myAtom } from '../../recoil/atoms';
import LoadingModal from '../ui/loading/LoadingModal';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import CheckBox from '../ui/check-box/CheckBox';
import CheckBoxSecond from '../ui/check-box/CheckBoxSecond';

import { GiCancel } from 'react-icons/gi';

const ProductCard = ({ key, payload }) => {
  const {
    index,
    id,
    title,
    price,
    description,
    tags,
    isSoldOut,
    thumbnail,
    assignCheckList,
    checkList,
    selectAll,
    isCanceled,
    tableHeader,
    tableFooter,
  } = payload;
  const atom = useRecoilValue(myAtom);
  const removeProduct = useMutation((id) => deleteProduct(id), {
    // 성공하면 닫고 데이터 refetch
    onSuccess: () => {
      atom.myFn(); // refetch 함수
    },
  });
  console.log('assignCheckList함수: ', typeof assignCheckList);
  const handleChange = (event) => {
    setChecked((prev) => !prev);
    assignCheckList(id, event.currentTarget.checked);
  };
  // 카드의 체크여부
  const [checked, setChecked] = useState(false);

  // 전체박스 체크유무에 의존한 체킹
  useEffect(() => {
    setChecked(selectAll);
    // console.log('id와 selectAll', id, selectAll);
    // TODO: 체크박스로 모두 선택하는 기능
    // assignCheckList(id, selectAll);
  }, [selectAll]);

  // 헤더인 경우
  if (tableHeader) {
    return (
      <li className={[style.card, style.tableHeader].join(' ')}>
        <div>
          <CheckBox id={'masterCheckBox'} />
        </div>
        <div>Price</div>
        <div>Product</div>
        {/* <div>Tags</div> */}
        <div>Sold Out</div>

        <div>Edit / Delete</div>
      </li>
    );
  }
  // 푸터인 경우
  if (tableFooter) {
    return (
      <li className={[style.card, style.tableFooter].join(' ')}>
        <div className={style.btn}>Previous</div>
        <div>Page 1 of 10</div>
        <div className={style.btn}>Next</div>
      </li>
    );
  }

  return (
    <li className={style.card}>
      <div className={style.select}>
        {/* <input type="checkbox" /> */}
        <CheckBoxSecond id={id} />
      </div>
      <div className={style.price}>
        <span className={!isSoldOut ? style.done : null}>₩ {price.toLocaleString()}</span>
      </div>
      <div className={style.product}>
        <img src={thumbnail} alt="" className={style.thumbnail} />
        <div className={style.texts}>
          <span className={style.id}>{id}</span>
          <span className={style.title}>{title}</span>
          <ul className={style.tags}>
            {tags.map((tag) => (
              <li className={style.tag}>#{tag}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={style.soldOut}>
        <div className={isSoldOut ? style.active : null}>
          <GiCancel className={style.cancel} />
          Sold Out
        </div>
      </div>
      <div className={style.icons}>
        <AiOutlineEdit className={style.edit} />
        <AiOutlineDelete className={style.delete} />
      </div>
    </li>
  );
};

export default ProductCard;
