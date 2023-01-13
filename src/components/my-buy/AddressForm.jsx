import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import style from './AddressForm.module.css';
import { useState } from 'react';

const AddressBtn = ({ errorStyle, fromError, register, setValue }) => {
  const [address, setAddress] = useState({});

  const open = useDaumPostcodePopup();

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    setAddress({ zonecode: data.zonecode, fullAddress: fullAddress });

    setValue('postcode', data.zonecode);
    setValue('addressDefault', fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div className={style.deliveryForm}>
      <span>배송지 주소 *</span>
      <div>
        <input
          value={address.zonecode || ''}
          className={style.post}
          readOnly
          onClick={handleClick}
          {...register('postcode', {
            required: '필수 입력 항목입니다',
          })}
          placeholder="우편번호"
        />
        <button className={style.btn} type="button" onClick={handleClick}>
          주소 찾기
        </button>

        <strong className={errorStyle ? style.setError : style.error}>
          {fromError?.postcode?.message || fromError?.addressDefault?.message}
        </strong>

        <div className={style.address}>
          <input
            value={address.fullAddress || ''}
            readOnly
            {...register('addressDefault', {
              required: '필수 입력 항목입니다',
            })}
          />
          <input {...register('addressAdd')} placeholder="추가 주소 입력" />
        </div>
      </div>
    </div>
  );
};

export default AddressBtn;
