import React, { useEffect } from 'react';
import style from './DeliveryForm.module.css';
import AddressForm from './AddressForm';

const DeliveryForm = ({ register, fromError, errorStyle, setValue, setFocus }) => {
  const onChangeName = (event) => {
    setValue('name', event.target.value.trim());
  };
  const onChangeNumberOne = (event) => {
    if (event.target.value.length === 4) {
      setFocus('num3');
    }
  };
  const onChangeNumberTwo = (event) => {
    if (event.target.value.length >= 4) {
      setValue('num3', event.target.value.substr(0, 4));
    }
  };

  return (
    <div className={style.deliveryInfo}>
      <h2>배송지정보</h2>
      <form>
        <p>
          <span>수령인 *</span>
          <input
            {...register('name', {
              required: '필수 입력 항목입니다',
              onChange: onChangeName,
              maxLength: {
                value: 50,
                message: '50자 이내로 입력해주세요',
              },
            })}
            placeholder="50자 이내로 입력하세요"
          />
          <strong className={errorStyle ? style.setError : style.error}>{fromError?.name?.message}</strong>
        </p>
        <p className={style.numberForm}>
          <span>연락처 *</span>
          <select {...register('num1')}>
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
            <option value="018">018</option>
            <option value="019">019</option>
            <option value="02">02</option>
            <option value="031">031</option>
            <option value="032">032</option>
            <option value="033">033</option>
            <option value="041">041</option>
            <option value="042">042</option>
            <option value="043">043</option>
          </select>
          <input
            type="number"
            {...register('num2', {
              required: '필수 입력 항목입니다',
              onChange: onChangeNumberOne,
              minLength: {
                value: 3,
                message: '3자 이상 입력해주세요',
              },
            })}
          />
          <input
            type="number"
            {...register('num3', {
              required: '필수 입력 항목입니다',
              onChange: onChangeNumberTwo,
              minLength: {
                value: 4,
                message: '4자 이상 입력해주세요',
              },
            })}
          />
          <strong className={errorStyle ? style.setError : style.error}>
            {fromError?.num2?.message || fromError?.num3?.message}
          </strong>
        </p>
        <AddressForm register={register} fromError={fromError} errorStyle={errorStyle} setValue={setValue} />
        <p>
          <span>배송메모</span>
          <input
            {...register('memo', {
              maxLength: {
                value: 30,
                message: '30자 이내로 입력해주세요',
              },
            })}
            placeholder="30자 이내로 요청 사항을 입력해주세요"
          />
          <strong className={errorStyle ? style.setError : style.error}>{fromError?.memo?.message}</strong>
        </p>
      </form>
    </div>
  );
};

export default DeliveryForm;
