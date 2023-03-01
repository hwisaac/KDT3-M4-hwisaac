import React from 'react';
import styled from 'styled-components';

export default function PriceCard({ text, price }) {
  return (
    <Price>
      <PriceSummaryT text={text === 'Total' ? 'total' : null}>{text}</PriceSummaryT>
      <PriceSummaryD text={text === 'Total' ? 'total' : null}>{`${price && price.toLocaleString()}원`}</PriceSummaryD>
    </Price>
  );
}

const Price = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

const PriceSummaryT = styled.div`
  /* font-weight: bold; */
  width: 40%;
  font-size: ${(props) => (props.text === 'total' ? '2rem' : '1.5rem')};
`;

const PriceSummaryD = styled.div`
  /* font-weight: bold; */
  width: 60%;
  text-align: right;
  font-size: ${(props) => (props.text === 'total' ? '2rem' : '1.5rem')};
`;
