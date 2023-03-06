import React from 'react';
import styled from 'styled-components';
import CheckBox from '../ui/check-box/CheckBox';

const TableFooter = () => {
  return (
    <Wrapper>
      <div className="btn">Previous</div>
      <div>Page 1 of 10</div>
      <div className="btn">Next</div>
    </Wrapper>
  );
};
export default TableFooter;

const Wrapper = styled.li`
  display: grid;
  grid-template-columns: 30px 150px 90px auto 100px 50px 100px;
  gap: 15px;
  box-sizing: border-box;
  padding: 10px 15px;
  border: 2px solid var(--color-light-gray2);
  border-top: none;
  color: #32353d;

  display: flex;
  justify-content: space-between;
  color: #7a808c;
  font-size: 14px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  .btn {
    border: 2px solid var(--color-light-gray2);
    padding: 10px 15px;
    margin: 0 20px;
    border-radius: 5px;
    cursor: pointer;
  }
`;
