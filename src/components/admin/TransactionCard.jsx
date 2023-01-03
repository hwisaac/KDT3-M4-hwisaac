import React from 'react';
import style from './TransactionCard.module.css';
import { alternativeImg } from '../../recoil/userInfo';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';
import { BiLoader } from 'react-icons/bi';

import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import CheckBox from '../ui/check-box/CheckBox';
import { bank } from '../../recoil/atoms';
import { useRecoilValue } from 'recoil';
import bankI from '../../assets/image/sp_bankbi.png';
import BankIcon from '../ui/bank-icon/BankIcon';

function TransactionCard({ payload }) {
  const {
    index = 0,
    done = true,
    isCanceled = true,
    timePaid = '',
    product,
    user,
    account,
    tableHeader,
    tableFooter,
  } = payload;
  const bankIcon = useRecoilValue(bank);

  const { accountNumber, bankCode, bankName } = { ...account };
  const { description, price, productId, tags, thumbnail, title } = { ...product };
  const { displayName, email, profileImg } = { ...user };

  // console.log(payload);

  // (user) email, displayName,
  // (product) title, thumbnail, price
  // (account) accountNumber, bankName
  // detailId, done, isCanceled
  if (tableHeader) {
    return (
      <li className={[style.card, style.tableHeader].join(' ')}>
        <div>
          <CheckBox id={'masterCheckBox'} />
        </div>
        <div>User</div>
        <div>Price</div>
        <div>Product</div>
        <div>Status</div>
        <div>Bank</div>
        <div></div>
      </li>
    );
  }

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
        <input type="checkbox" />
      </div>
      <div className={style.user}>
        <img className={style.profileImg} src={profileImg ? profileImg : alternativeImg} />
        <div>
          <span className={style.displayName}>{displayName}</span>
          <span className={style.email}>{email}</span>
        </div>
      </div>
      <div className={style.price}>
        <span className={done ? style.done : null}>₩ {price.toLocaleString()}</span>
      </div>
      <div className={style.product}>
        <span className={style.title}>{title}</span>
      </div>
      <div className={style.status}>
        <div className={!(done || isCanceled) ? style.active : null}>
          <BiLoader className={style.pending} />
          Pending
        </div>
        <div className={done ? style.active : null}>
          <BsFillBagCheckFill className={style.complete} />
          Done
        </div>
        <div className={isCanceled ? style.active : null}>
          <GiCancel className={style.cancel} />
          Canceled
        </div>
      </div>
      <div className={style.bank}>
        <BankIcon bankCode={bankCode} scale={'25%'} className={style.bankIcon} />
      </div>
      <div className={style.icons}>
        <AiOutlineEdit className={style.edit} />
        <AiOutlineDelete className={style.delete} />
      </div>
    </li>
  );
}

export default TransactionCard;
