import React from 'react';
import AddressForm from './AddressForm';
import styled from 'styled-components';

const ShippingForm = ({ register, fromError, errorStyle, setValue }) => {
  return (
    <Wrap>
      <Item>
        <input
          {...register('name', {
            required: 'Required field.',
            maxLength: {
              value: 50,
              message: 'Please enter within 50 characters.',
            },
          })}
          placeholder="NAME *"
        />
        <ErrorMassage>{fromError?.name?.message}</ErrorMassage>
      </Item>

      <Item>
        <input
          type="number"
          {...register('number', {
            required: 'Required field.',
            minLength: {
              value: 10,
              message: 'Please enter at least 10 characters',
            },
            maxLength: {
              value: 12,
              message: 'Please enter within 12 characters.',
            },
          })}
          placeholder="PHONE NUMBER *"
        />
        <ErrorMassage>{fromError?.number?.message}</ErrorMassage>
      </Item>

      <AddressForm register={register} fromError={fromError} errorStyle={errorStyle} setValue={setValue} />

      <Item>
        <input
          {...register('memo', {
            maxLength: {
              value: 30,
              message: 'Please enter within 30 characters.',
            },
          })}
          placeholder="SHIPPING MEMO"
        />
        <ErrorMassage>{fromError?.memo?.message}</ErrorMassage>
      </Item>
    </Wrap>
  );
};

const Wrap = styled.form``;
const Item = styled.div`
  position: relative;
  input {
    width: 80%;
    margin-bottom: 20px;
    padding: 10px;
    border: none;
    border-bottom: 1px solid var(--color-light-grey);
    outline: none;
    background-color: transparent;
    font-size: 15px;
    font-family: 'Pangram';
    ::placeholder {
      font-family: 'Fahkwang';
    }
  }
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const ErrorMassage = styled.p`
  position: absolute;
  top: 15%;
  right: 20%;
`;

export default ShippingForm;
