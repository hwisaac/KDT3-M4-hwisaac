import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useState } from 'react';
import styled from 'styled-components';

const AddressForm = ({ errorStyle, fromError, register, setValue }) => {
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
    <Wrap>
      <ZipCode>
        <input
          value={address.zonecode || ''}
          readOnly
          onClick={handleClick}
          {...register('postcode', {
            required: 'Required field.',
          })}
          placeholder="ZIP CODE *"
        />
        <button type="button" onClick={handleClick}>
          FIND ADDRESS
        </button>
        <ErrorMassage>{fromError?.postcode?.message || fromError?.addressDefault?.message}</ErrorMassage>
      </ZipCode>

      <MainAddress>
        <Input
          value={address.fullAddress || ''}
          readOnly
          {...register('addressDefault', {
            required: 'Required field.',
          })}
          placeholder="MAIN ADDRESS *"
        />
        <ErrorMassage>{fromError?.postcode?.message || fromError?.addressDefault?.message}</ErrorMassage>
      </MainAddress>

      <Input {...register('addressAdd')} placeholder="ADDITIONAL ADDRESS" />
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-bottom: 10px;
`;
const ZipCode = styled.div`
  position: relative;
  input {
    width: 20%;
    margin-bottom: 10px;
    margin-right: 10px;
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
  button {
    padding: 10px 15px;
    outline: none;
    border: none;
    background-color: #303631;
    color: var(--color-white);
    font-family: 'Fahkwang';
  }
`;

const MainAddress = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 80%;
  margin-bottom: 10px;
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
`;

const ErrorMassage = styled.p`
  position: absolute;
  top: 15%;
  right: 20%;
`;

export default AddressForm;
