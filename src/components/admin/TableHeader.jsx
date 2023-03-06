import React from 'react';
import styled from 'styled-components';
import CheckBox from '../ui/check-box/CheckBox';

const TableHeader = () => {
  return (
    <Wrapper>
      <div>
        <CheckBox id={'masterCheckBox'} />
      </div>
      <div>User</div>
      <div>Price</div>
      <div>Product</div>
      <div>Status</div>
      <div>Bank</div>
      <div></div>
    </Wrapper>
  );
};
export default TableHeader;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 30px 150px 90px auto 100px 50px 100px;
  gap: 15px;
  box-sizing: border-box;
  padding: 10px 15px;
  border: 2px solid var(--color-light-gray2);
  border-top: none;
  color: #32353d;

  font-size: 12px;
  border: 2px solid var(--color-light-gray2);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #f9fbfc;
  color: #7a808c;
  padding: 13px 15px;
`;
