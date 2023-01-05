import React from 'react';
import style from './DeliveryForm.module.css';
import AddressBtn from './AddressForm';

const DeliveryForm = ({ register, fromError, errorStyle, setValue }) => {
  return (
    <div className={style.deliveryInfo}>
      <h2>배송지정보</h2>
      <form>
        <p>
          <span>수령인 *</span>
          <input
            {...register('name', {
              required: '필수 입력 항목입니다',
              maxLength: {
                value: 50,
                message: '50자 이내로 입력해주세요',
              },
            })}
            placeholder="50자 이내로 입력하세요"
          />
          <strong className={errorStyle ? style.setError : style.error}>{fromError?.name?.message}</strong>
        </p>
        <p>
          <span>연락처 *</span>
          <input
            type="number"
            {...register('number', {
              required: '필수 입력 항목입니다',
              maxLength: {
                value: 12,
                message: '12자 이내로 입력해주세요',
              },
            })}
            placeholder="- 기호는 제외하고 입력해주세요"
          />
          <strong className={errorStyle ? style.setError : style.error}>{fromError?.number?.message}</strong>
        </p>
        <AddressBtn register={register} fromError={fromError} errorStyle={errorStyle} setValue={setValue} />
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
